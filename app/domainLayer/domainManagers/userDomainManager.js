const userRegisterViewModel = require('../../presentationLayer/viewModels/userRegisterVewModel.js'); 
const registrationResolver = require('../domainResolvers/registrationResolver.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');

const userLoginViewModel = require('../../presentationLayer/viewModels/userLoginViewModel.js');
const loginResolver = require('../domainResolvers/loginResolver.js');
const sessionDomainModelFactory = require('../domainFactories/sessionDomainModelFactory.js');
const domainModel = require('../../servicesLayer/enumerations/domainModel.js');
const sessionRepository = require('../../dataAccessLayer/repositories/sessionRepository.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');
const messageService = require('../../servicesLayer/messages/messageService.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');
const sessionConfig = require('../../../configuration/authentication/sessionConfig.js');
const userRepository = require('../../dataAccessLayer/repositories/userRepository.js');
const userDomainModelFactory = require('../domainFactories/userDomainModelFactory.js');
const domainModelEnum = require('../../servicesLayer/enumerations/domainModel.js');

const resolveUserRegistrationAsync = async function(request){
    
    const _userViewModel = new userRegisterViewModel(request.body);
    let resultValidation = await registrationResolver.validateRegistrationAsync(_userViewModel);

    if (resultValidation.status === httpResponseStatus._200ok) {
        let _currentUserRoleEnum = request.body.userRole;
        let _userDomainModel = resultValidation.result;
        let resultRegistration = await registrationResolver.saveRegistrationToDatabaseAsync(_currentUserRoleEnum, _userDomainModel);
        
        return resultRegistration;
    }

    return resultValidation;

}

//Test: DONE
const resolveUserLoginSessionAsync = async function (request) {

    let _user = new userLoginViewModel(request.body);
    let resultInspection = await loginResolver.validateLoginAsync(_user);

    if (resultInspection.status === httpResponseStatus._200ok) {

        let _userDtoModel = resultInspection.result;       
        let resultLoginStorage = await loginResolver.saveLoginToDatabaseAsync(_userDtoModel);        
        return resultLoginStorage;
    }
    return resultInspection;
}

//Test: DONE
const resolveUserLogoutSessionAsync = async function (request) {

    console.log('request type: ', request);
    const bearerSessionToken = request.get('Authorization');
    const currentSessionTokenArray = bearerSessionToken.split(' ');
    const lastIndex = currentSessionTokenArray.length - 1;
    if(!inputCommonInspector.stringIsValid(currentSessionTokenArray[lastIndex])){
        return httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._401unauthorized);
    }

    const objModel = {
        sessionToken : currentSessionTokenArray[lastIndex],
        expirationTimeMilliseconds: sessionConfig.activeSession.cookie.maxAge
    }
    const sessionDomainModel = sessionDomainModelFactory.createDomainModel(domainModel.SessionModel, objModel);
    sessionDomainModel.setSessionStatusIsActive(false);

    const sessionUpdateResultArray = await sessionRepository.updateSessionTableSetIsActiveColumnValueInDatabaseAsync (sessionDomainModel);   
    if (sessionUpdateResultArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(sessionUpdateResultArray, httpResponseStatus._400badRequest);
    }

    return httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._401unauthorized);

}


const resolveGetUserByIdAsync = async function(userId){

    const objModel = {
        userId : userId
    }
    let userDomainModel = userDomainModelFactory.createDomainModel(domainModelEnum.UserModel_MappedFromUserId, objModel);

    const userResultArray = await userRepository.getUserByUserIdAsync(userDomainModel);
    if (userResultArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(userResultArray, httpResponseStatus._400badRequest);
    }

    return httpResponseService.getResponseResultStatus(userResultArray, httpResponseStatus._200ok);
}

const userDomainManager = ({
    resolveUserRegistrationAsync:resolveUserRegistrationAsync,
    resolveUserLoginSessionAsync:resolveUserLoginSessionAsync,
    resolveUserLogoutSessionAsync: resolveUserLogoutSessionAsync,
    resolveGetUserByIdAsync : resolveGetUserByIdAsync
});

module.exports = userDomainManager;