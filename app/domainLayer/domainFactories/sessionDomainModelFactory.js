const uuidV4 = require('uuid');
const uuid = uuidV4.v4;

const domainModelEnumeration = require('../../servicesLayer/enumerations/domainModel.js');
const cookieModel = require('../domainModels/cookieModel.js');
const sessionConfig = require('../../../configuration/authentication/sessionConfig.js');
const sessionModel = require('../domainModels/sessionModel.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');


const createDomainModel = function(domainModelEnum , objModel ){
    let model = null;

    switch(domainModelEnum){

        case domainModelEnumeration.CookieObjectModel:
            model = createCookieObj(objModel.sessionToken);
        break;

        case domainModelEnumeration.SessionModel:

            model = createSessionModel(objModel.userId, objModel.sessionToken, objModel.data, objModel.expirationTimeMilliseconds);
        break;

        case domainModelEnumeration.SessionDomainModel_MappedFromSessionDtoModel:
        model = createSessionDomainModelMappedFromSessionDtoModel(objModel);
        break;
    }

    return model;
}


const sessionDomainModelFactory = Object.freeze({
    createDomainModel : createDomainModel
});

module.exports = sessionDomainModelFactory;


//#REGION Private Functions 
const createCookieObj = function (sessionToken) {
    let defaultPath = '/';
    let selectedPath  = (inputCommonInspector.stringIsNullOrEmpty(sessionConfig.activeSession.cookie.path) ) ? defaultPath : sessionConfig.activeSession.cookie.path;
    let _cookieModel = new cookieModel();
    _cookieModel.setName(sessionConfig.activeSession.name);
    _cookieModel.setValue(sessionToken);
    _cookieModel.setProperties(selectedPath, sessionConfig.activeSession.cookie.maxAge, true);
    
    
    let cookieObject = _cookieModel.getCookieObject();
    return cookieObject;
}

const createSessionModel = function (userId, sessionToken, data, expirationTimeMilliseconds) {
    let sessionUuid = uuid();
    let _sessionModel = new sessionModel();
    _sessionModel.setSessionId(sessionUuid);
    _sessionModel.setUserId(userId);
    _sessionModel.setSessionToken(sessionToken);
    _sessionModel.setData(data);
    _sessionModel.setExpiryInMilliseconds(expirationTimeMilliseconds);
    _sessionModel.setSessionStatusIsActive(true);

    return _sessionModel;
}

const createSessionDomainModelMappedFromSessionDtoModel = function(sessionDtoModel){

    let _sessionModel = new sessionModel();
    _sessionModel.setSessionId(sessionDtoModel.SessionId.value);
    _sessionModel.setUserId(sessionDtoModel.UserId.value);
    _sessionModel.setSessionToken(sessionDtoModel.SessionToken.value);
    _sessionModel.setExpiryInMilliseconds(sessionDtoModel.Expires.value);
    _sessionModel.setData(sessionDtoModel.Data.value);
    _sessionModel.setSessionStatusIsActive(sessionDtoModel.IsActive.value);

    return _sessionModel;
}

//#ENDREGION Private Functions 