const helpers = require('../../../servicesLayer/common/helpers.js');
const sessionService = require('../../../servicesLayer/authentication/sessionService.js');
const dbContext = require('../context/dbContext.js');
const monitorService = require('../../../servicesLayer/monitoring/monitorService.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');

let _context = null;

onInit();
//Test: DONE

const createSessionDtoModel = function(dtoModelEnum, paramOptions){

    console.log('paramOptions: ', paramOptions);
    let result = null;
    switch(dtoModelEnum){
        case dtoModel.SessionDtoModel_MappedFromDomain:
            result = createSessionDtoModelMappedFromDomain(paramOptions.parameterObject);
            break;

            case dtoModel.SessionDtoModel_MappedFromDatabase:
            result = createSessionsDtoModelMappedFromDatabase(paramOptions.parameterArray);
            break;
    }

    return result;
}

const sessionDtoModelFactory = Object.freeze({
    createSessionDtoModel:createSessionDtoModel
});
module.exports = sessionDtoModelFactory;

//#REGION Private Functions

const createSessionDtoModelMappedFromDomain = function(sessionDomainModel){
    let dateNow = new Date();
    let utcDateCreated = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    let expiryInMilliseconds = sessionDomainModel.getExpiryInMilliseconds();
    let dateExpiredCalculation = sessionService.calculateSessionDateExpiry(dateNow,expiryInMilliseconds );

    let utcDateExpiredFormatted = helpers.convertLocaleDateToUTCFormatForDatabase(dateExpiredCalculation);
    let sessionStatus = (sessionDomainModel.getSessionStatusIsActive());

    let _sessionDto = new _context.SessionDtoModel();
    _sessionDto.rawAttributes.SessionId.value = sessionDomainModel.getSessionId();
    _sessionDto.rawAttributes.SessionId.type.key = _sessionDto.rawAttributes.SessionId.type.key.toString();
    _sessionDto.rawAttributes.UserId.value = sessionDomainModel.getUserId();
    _sessionDto.rawAttributes.UserId.type.key = _sessionDto.rawAttributes.UserId.type.key.toString();
    _sessionDto.rawAttributes.SessionToken.value = sessionDomainModel.getSessionToken();
    _sessionDto.rawAttributes.SessionToken.type.key = _sessionDto.rawAttributes.SessionToken.type.key;
    _sessionDto.rawAttributes.Expires.value = expiryInMilliseconds;
    _sessionDto.rawAttributes.Expires.type.key = _sessionDto.rawAttributes.Expires.type.key;
    _sessionDto.rawAttributes.Data.value = sessionDomainModel.getData();
    _sessionDto.rawAttributes.Data.type.key = _sessionDto.rawAttributes.Data.type.key;
    _sessionDto.rawAttributes.IsActive.value = sessionStatus;
    _sessionDto.rawAttributes.IsActive.type.key = _sessionDto.rawAttributes.IsActive.type.key;
    _sessionDto.rawAttributes.UTCDateCreated.value = utcDateCreated;
    _sessionDto.rawAttributes.UTCDateCreated.type.key =  _sessionDto.rawAttributes.UTCDateCreated.type.key.toString();
    _sessionDto.rawAttributes.UTCDateExpired.value = utcDateExpiredFormatted;
    _sessionDto.rawAttributes.UTCDateExpired.type.key =  _sessionDto.rawAttributes.UTCDateExpired.type.key.toString();

    let clonedAttributes = JSON.parse(JSON.stringify(_sessionDto.rawAttributes));
    return clonedAttributes;
}


//Test: DONE
const createSessionsDtoModelMappedFromDatabase = function(databaseResultArray) {
    let allSessionsDtoModels = [];
    for (let a = 0; a < databaseResultArray.length; a++) {
        let sessionDatabase = databaseResultArray[a];
        monitorService.capture('sessionDatabase', sessionDatabase);
        let _sessionDtoModel =new _context.SessionDtoModel();
        monitorService.capture('_sessionDtoModel', _sessionDtoModel);

        _sessionDtoModel.rawAttributes.SessionId.value = sessionDatabase.SessionId;
        _sessionDtoModel.rawAttributes.UserId.value = sessionDatabase.UserId;
        _sessionDtoModel.rawAttributes.SessionToken.value = sessionDatabase.SessionToken;
        _sessionDtoModel.rawAttributes.Expires.value = sessionDatabase.Expires;
        _sessionDtoModel.rawAttributes.Data.value = sessionDatabase.Data;
        _sessionDtoModel.rawAttributes.IsActive.value = (sessionDatabase.IsActive !== 0);

        _sessionDtoModel.rawAttributes.UTCDateCreated.value = sessionDatabase.UTCDateCreated;
        _sessionDtoModel.rawAttributes.UTCDateExpired.value = sessionDatabase.UTCDateExpired;

        let clonedAttributes = JSON.parse(JSON.stringify(_sessionDtoModel.rawAttributes));
        //NOTE: JSON Parse, converts Date values to Locale, We re-insert the original UTC Dates
        clonedAttributes.UTCDateCreated.value = sessionDatabase.UTCDateCreated;
        clonedAttributes.UTCDateExpired.value = sessionDatabase.UTCDateExpired;
        allSessionsDtoModels.push(clonedAttributes);
    }

    return allSessionsDtoModels;
}



function onInit(){
    _context = dbContext.getSequelizeContext();
}
//#ENDREGION Private Functions