const dbContext = require('../context/dbContext.js');
const helpers = require('../../../servicesLayer/common/helpers.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel');
const monitorService = require('../../../servicesLayer/monitoring/monitorService.js');



let _context = null;

onInit();

const createResponseStatementDtoModel = function(dtoModelEnum, paramOptions){

    console.log('paramOptions: ', paramOptions);
    let result = null;
    switch(dtoModelEnum){

        case dtoModel.ResponseStatementDtoModel_MappedFromDomain:
            result = createResponseStatementDtoModelMappedFromDomain(paramOptions.parameterObject);
        break;

        case dtoModel.ResponseStatementDtoModel_MappedFromDatabase:
            result = createResponseStatementDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;
    }

    return result;
}

const responseStatementDtoModelFactory = Object.freeze({
    createResponseStatementDtoModel : createResponseStatementDtoModel
});

module.exports = responseStatementDtoModelFactory;

//#REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
}


function createResponseStatementDtoModelMappedFromDomain(responseStatementDomainModel){

    let dateNow = new Date();

    let _responseStatementDtoModel = new _context.ResponseStatementDtoModel();
    _responseStatementDtoModel.rawAttributes.ResponseStatementId.value = responseStatementDomainModel.getResponseStatementId();
    _responseStatementDtoModel.rawAttributes.ResponseStatementId.type.key =  _responseStatementDtoModel.rawAttributes.ResponseStatementId.type.key.toString();
    _responseStatementDtoModel.rawAttributes.Name.value = responseStatementDomainModel.getName();
    _responseStatementDtoModel.rawAttributes.Name.type.key = _responseStatementDtoModel.rawAttributes.Name.type.key.toString();
    _responseStatementDtoModel.rawAttributes.QuestionnaireId.value = responseStatementDomainModel.getQuestionnaireId();
    _responseStatementDtoModel.rawAttributes.QuestionnaireId.type.key = _responseStatementDtoModel.rawAttributes.QuestionnaireId.type.key.toString();
    _responseStatementDtoModel.rawAttributes.UserId.value = responseStatementDomainModel.getUserId();
    _responseStatementDtoModel.rawAttributes.UserId.type.key =  _responseStatementDtoModel.rawAttributes.UserId.type.key.toString();
    _responseStatementDtoModel.rawAttributes.UTCDateCreated.value = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    _responseStatementDtoModel.rawAttributes.UTCDateCreated.type.key =  _responseStatementDtoModel.rawAttributes.UTCDateCreated.type.key.toString();
    _responseStatementDtoModel.rawAttributes.UTCDateUpdated.value = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    _responseStatementDtoModel.rawAttributes.UTCDateUpdated.type.key =  _responseStatementDtoModel.rawAttributes.UTCDateUpdated.type.key.toString();

    let clonedAttributes = JSON.parse(JSON.stringify(_responseStatementDtoModel.rawAttributes));
    return clonedAttributes;
}


function createResponseStatementDtoModelMappedFromDatabase(databaseResultArray){

    let allresponseStatementDtoModels = [];
    for (let a = 0; a < databaseResultArray.length; a++) {
        let responseStatementDatabase = databaseResultArray[a];        
        
        monitorService.capture('responseStatementDatabase', responseStatementDatabase);
        let _responseStatementDtoModel = new _context.ResponseStatementDtoModel();
        monitorService.capture('_responseStatementDtoModel', _responseStatementDtoModel);

        _responseStatementDtoModel.rawAttributes.ResponseStatementId.value = responseStatementDatabase.ResponseStatementId;
        _responseStatementDtoModel.rawAttributes.Name.value = responseStatementDatabase.Name;
        _responseStatementDtoModel.rawAttributes.QuestionnaireId.value = responseStatementDatabase.QuestionnaireId;
        _responseStatementDtoModel.rawAttributes.UserId.value = responseStatementDatabase.UserId;        
        _responseStatementDtoModel.rawAttributes.UTCDateCreated.value = responseStatementDatabase.UTCDateCreated;
        _responseStatementDtoModel.rawAttributes.UTCDateUpdated.value = responseStatementDatabase.UTCDateUpdated;

        let clonedAttributes = JSON.parse(JSON.stringify(_responseStatementDtoModel.rawAttributes));
        allresponseStatementDtoModels.push(clonedAttributes);
    }

    return allresponseStatementDtoModels;
}

//#ENDREGION Private Functions 