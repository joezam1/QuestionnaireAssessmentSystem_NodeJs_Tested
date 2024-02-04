const uuidV4 = require('uuid');
const uuid = uuidV4.v4;
const authViewModel = require('../../presentationLayer/viewModels/authViewModel.js');


const validationService = require('../../servicesLayer/validation/validationService.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');

const userDomainModelFactory = require('../domainFactories/userDomainModelFactory.js');
const domainModelEnum = require('../../servicesLayer/enumerations/domainModel.js');
const userRepository = require('../../dataAccessLayer/repositories/userRepository.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');

const messageService = require('../../servicesLayer/messages/messageService.js'); 
const encryptionService = require('../../servicesLayer/encryption/encryptionService.js');
const sessionService = require('../../servicesLayer/authentication/sessionService.js');
const sessionDomainModelFactory = require('../domainFactories/sessionDomainModelFactory.js');
const sessionDomainManager = require('../domainManagers/sessionDomainManager.js');
const sessionConfig = require('../../../configuration/authentication/sessionConfig.js');
//const parameterOptions = require('../../dataAccessLayer/mysqlDataStore/dtoModelsFactories/parameterOptions.js');



//Test: DONE
async function validateLoginAsync(userViewModel) {

    const errorsReport = validationService.resolveUserModelValidation(userViewModel);
    if (!inputCommonInspector.objectIsNullOrEmpty(errorsReport)) {
        return httpResponseService.getResponseResultStatus(errorsReport, httpResponseStatus._401unauthorized);
    }

    const _userDomainModel = userDomainModelFactory.createDomainModel(domainModelEnum.UserModel_MappedFromUserViewModel,userViewModel);

    const UsersDtoModelArray = await userRepository.getUserByEmailDataAsync(_userDomainModel);
    if (UsersDtoModelArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(UsersDtoModelArray, httpResponseStatus._400badRequest);
    }
    else if (UsersDtoModelArray.length === 0) {
        return httpResponseService.getResponseResultStatus(messageService.usernameOrPasswordNotMatching, httpResponseStatus._401unauthorized);
    }

    let pwdPlainText = _userDomainModel.getPassword();
    let userDtoModel = UsersDtoModelArray[0];
    let pwdDatabase = userDtoModel.Password.value;
    let passwordsAreTheSame = await encryptionService.validateEncryptedStringInputAsync(pwdPlainText, pwdDatabase);
    if (!passwordsAreTheSame) {
        return httpResponseService.getResponseResultStatus(messageService.usernameOrPasswordNotMatching, httpResponseStatus._401unauthorized);
    }

    return httpResponseService.getResponseResultStatus(userDtoModel, httpResponseStatus._200ok);
}

//Test: DONE
async function saveLoginToDatabaseAsync(userDtoModel) {

    let token = await sessionService.generateSessionTokenAsync();
    let model = {sessionToken : token};

    let cookieObj = sessionDomainModelFactory.createDomainModel(domainModelEnum.CookieObjectModel, model );

    let sessionModel = createSessionModel(userDtoModel, token, cookieObj);
    let sessionResult = await sessionDomainManager.insertSessionIntoDatabaseAsync(sessionModel);
        
    if (sessionResult instanceof Error || sessionResult.result instanceof Error) {
        return httpResponseService.getResponseResultStatus(sessionResult, httpResponseStatus._500internalServerError);
    }
    let isResultArrayOk = (sessionResult.length > 0 && sessionResult[0].affectedRows === 1)
    let isResultObjectOk = (inputCommonInspector.objectIsValid(sessionResult) && sessionResult.result && sessionResult.status === httpResponseStatus._201created);
    if (isResultArrayOk || isResultObjectOk) {

        let authModel = {           
            session : cookieObj
        }
        let _authViewModel = new authViewModel(authModel);

        return httpResponseService.getResponseResultStatus( _authViewModel, httpResponseStatus._200ok);
    }

    return httpResponseService.getResponseResultStatus(messageService.errorProcessingUserLogin, httpResponseStatus._422unprocessableEntity);
}

const loginResolver = {
    validateLoginAsync : validateLoginAsync,
    saveLoginToDatabaseAsync : saveLoginToDatabaseAsync
}


module.exports = loginResolver;


//#REGION Private Functions

function createSessionModel(userDtoModel, sessionToken, cookieObj) {

    const cookieJson = JSON.stringify(cookieObj);
    const model = {
        userId : userDtoModel.UserId.value, 
        sessionToken : sessionToken, 
        data : cookieJson, 
        expirationTimeMilliseconds : sessionConfig.SESSION_EXPIRATION_TIME_IN_MILLISECONDS
    }

    const sessionModel = sessionDomainModelFactory.createDomainModel(domainModelEnum.SessionModel ,model );  
    return sessionModel;
}



//#ENDREGION Private Functions