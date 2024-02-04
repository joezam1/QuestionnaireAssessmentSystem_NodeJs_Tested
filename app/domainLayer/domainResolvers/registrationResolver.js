const uuidV4 = require('uuid');
const uuid = uuidV4.v4;

const validationService = require('../../servicesLayer/validation/validationService.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');

const userDomainModelFactory = require('../domainFactories/userDomainModelFactory.js');
const domainModelEnum = require('../../servicesLayer/enumerations/domainModel.js');
const roleEnum = require('../../servicesLayer/enumerations/role.js');

const userRepository = require('../../dataAccessLayer/repositories/userRepository.js');
const roleRepository = require('../../dataAccessLayer/repositories/roleRepository.js');
const registerRepository = require('../../dataAccessLayer/repositories/registerRepository.js');
const notificationService = require('../../servicesLayer/messages/messageService.js');
const dbAction = require('../../dataAccessLayer/mysqlDataStore/context/dbAction.js');
const encryptionService = require('../../servicesLayer/encryption/encryptionService.js');
const monitorService = require('../../servicesLayer/monitoring/monitorService.js');


const validateRegistrationAsync = async function (userViewModel) {
    const errorsReport = validationService.resolveUserModelValidation(userViewModel);
    if (!inputCommonInspector.objectIsNullOrEmpty(errorsReport)) {
        return httpResponseService.getResponseResultStatus(errorsReport, httpResponseStatus._401unauthorized);
    }

    const _userDomainModel = userDomainModelFactory.createDomainModel(domainModelEnum.UserModel_MappedFromUserViewModel,userViewModel);
    const userResult = await userRepository.getUserByUsernameAndEmailDataAsync(_userDomainModel);
    if (userResult instanceof Error) {
        return httpResponseService.getResponseResultStatus(userResult, httpResponseStatus._400badRequest);
    }
    else if (userResult.length > 0) {
        return httpResponseService.getResponseResultStatus(notificationService.usernameOrEmailTaken, httpResponseStatus._401unauthorized);
    }

    return httpResponseService.getResponseResultStatus(_userDomainModel, httpResponseStatus._200ok);

}

const saveRegistrationToDatabaseAsync = async function(currentRoleEnumeration, userDomainModel){
    let selectedRoleDescription = roleEnum[currentRoleEnumeration];
    let selectedRoleObj = await getSelectedRoleAsync(selectedRoleDescription);

    if (selectedRoleObj instanceof Error) {
        return httpResponseService.getResponseResultStatus(selectedRoleObj, httpResponseStatus._400badRequest);
    }

    else if (selectedRoleObj != null) {
        let userPassword = userDomainModel.getPassword();
        let encryptedPassword = await encryptionService.encryptStringInputAsync(userPassword);
        userDomainModel.setPassword(encryptedPassword);
        let resultTransaction = await createAndRegisterUserTransactionAsync(userDomainModel, selectedRoleObj);
        return resultTransaction;
    }

    return httpResponseService.getResponseResultStatus(notificationService.registrationNotCompleted, httpResponseStatus._400badRequest);

}

const registrationResolver = Object.freeze({
    validateRegistrationAsync:validateRegistrationAsync,
    saveRegistrationToDatabaseAsync:saveRegistrationToDatabaseAsync

});

module.exports = registrationResolver;


//#REGION Private Functions
async function getSelectedRoleAsync(roleName) {

    let allRolesResult = await roleRepository.getAllRolesAsync();
    if (allRolesResult instanceof Error) {
        let objResponse = httpResponseService.getResponseResultStatus(allRolesResult, httpResponseStatus._400badRequest);
        return objResponse;
    }

    for (let a = 0; a < allRolesResult.length; a++) {
        if (allRolesResult[a].Name.value.toLowerCase() === roleName.toLowerCase()) {

            let roleResponse = userDomainModelFactory.createDomainModel( domainModelEnum.RoleModel_MappedFromRoleDtoModel, allRolesResult[a] )
           
            return roleResponse;
        }
    }
    return null;
}




async function createAndRegisterUserTransactionAsync(userDomainModel, selectedRoleObj) {
    let newUuid = uuid();
    userDomainModel.setUserId(newUuid);
    const singleConnection = await dbAction.getSingleConnectionFromPoolPromiseAsync();
    try{
        await dbAction.beginTransactionSingleConnectionAsync(singleConnection);
        const insertedUserResult = await userRepository.insertUserIntoTableTransactionAsync(singleConnection, userDomainModel);

        if (insertedUserResult instanceof Error) {
            dbAction.rollbackTransactionSingleConnection(singleConnection);
            return httpResponseService.getResponseResultStatus(insertedUserResult, httpResponseStatus._400badRequest);
        }

        const _userId = userDomainModel.getUserId();
        const _roleId = selectedRoleObj.getRoleId();
        const _userRoleObj = {userId: _userId, roleId : _roleId};
        const _userRoleDomainModel = userDomainModelFactory.createDomainModel(domainModelEnum.UserRoleModel, _userRoleObj )
       
        const userRoleCreated = await userRepository.insertUserRoleIntoTableTransactionAsync(singleConnection, _userRoleDomainModel);
        if (userRoleCreated instanceof Error) {
            dbAction.rollbackTransactionSingleConnection(singleConnection);
            return httpResponseService.getResponseResultStatus(userRoleCreated, httpResponseStatus._400badRequest);
        }


        const _registerObj = {userId:_userId};
        const registerInfo = userDomainModelFactory.createDomainModel(domainModelEnum.RegisterModel, _registerObj);
       
        const registerCreated = await registerRepository.insertRegisterIntoTableTransactionAsync(singleConnection, registerInfo);
        if (registerCreated instanceof Error) {
            dbAction.rollbackTransactionSingleConnection(singleConnection);
            return httpResponseService.getResponseResultStatus(registerCreated, httpResponseStatus._400badRequest);
        }

        dbAction.commitTransactionSingleConnection(singleConnection);
        return httpResponseService.getResponseResultStatus(registerCreated, httpResponseStatus._201created);
    }
    catch (error) {
        console.log('error: ', error);
        monitorService.capture('createAndRegisterUserTransactionAsync: error ', error)
        dbAction.rollbackTransactionSingleConnection(singleConnection);
        return httpResponseService.getResponseResultStatus(error, httpResponseStatus._400badRequest);
    }
}
//#ENDREGION Private Functions 