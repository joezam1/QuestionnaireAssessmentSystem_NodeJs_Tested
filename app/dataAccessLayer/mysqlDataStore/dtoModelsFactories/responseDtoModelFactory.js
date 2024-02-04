const dbContext = require('../context/dbContext.js');
const helpers = require('../../../servicesLayer/common/helpers.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');

const uuidV4 = require('uuid');
const uuid = uuidV4.v4;


let _context = null;

onInit();

const createResponseDtoModel = function(dtoModelEnum, paramOptions){

    console.log('paramOptions: ', paramOptions);
    let result = null;
    switch(dtoModelEnum){

        case dtoModel.ResponseDtoModel_MappedFromDomain:
            result = createResponseDtoModelMappedFromDomain(paramOptions.parameterObject);
        break;

    }

    return result;
}

const responseDtoModelFactory = Object.freeze({
    createResponseDtoModel : createResponseDtoModel
});

module.exports = responseDtoModelFactory;



//#REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
}

function createResponseDtoModelMappedFromDomain(responseDomainModel){

    let dateNow = new Date();
    let responseUuid = uuid();
    let _responseDtoModel = new _context.ResponseDtoModel();
    _responseDtoModel.rawAttributes.ResponseId.value = responseUuid;
    _responseDtoModel.rawAttributes.ResponseId.type.key =  _responseDtoModel.rawAttributes.ResponseId.type.key.toString();
    _responseDtoModel.rawAttributes.ResponseNumber.value = responseDomainModel.getResponseNumber();
    _responseDtoModel.rawAttributes.ResponseNumber.type.key = _responseDtoModel.rawAttributes.ResponseNumber.type.key.toString();
    _responseDtoModel.rawAttributes.ResponseIndex.value = responseDomainModel.getResponseIndex();
    _responseDtoModel.rawAttributes.ResponseIndex.type.key = _responseDtoModel.rawAttributes.ResponseIndex.type.key.toString();
    _responseDtoModel.rawAttributes.ResponseStatementId.value = responseDomainModel.getResponseStatementId();
    _responseDtoModel.rawAttributes.ResponseStatementId.type.key = _responseDtoModel.rawAttributes.ResponseStatementId.type.key.toString();
    _responseDtoModel.rawAttributes.UserId.value = responseDomainModel.getUserId();
    _responseDtoModel.rawAttributes.UserId.type.key =  _responseDtoModel.rawAttributes.UserId.type.key.toString();
    _responseDtoModel.rawAttributes.QuestionChoiceId.value = responseDomainModel.getQuestionChoiceId();
    _responseDtoModel.rawAttributes.QuestionChoiceId.type.key = _responseDtoModel.rawAttributes.QuestionChoiceId.type.key.toString();
    _responseDtoModel.rawAttributes.QuestionId.value = responseDomainModel.getQuestionId();
    _responseDtoModel.rawAttributes.QuestionId.type.key = _responseDtoModel.rawAttributes.QuestionId.type.key.toString();
    _responseDtoModel.rawAttributes.ChoiceId.value = responseDomainModel.getChoiceId();
    _responseDtoModel.rawAttributes.ChoiceId.type.key = _responseDtoModel.rawAttributes.ChoiceId.type.key.toString();
    _responseDtoModel.rawAttributes.QuestionAsked.value = responseDomainModel.getQuestionAsked();
    _responseDtoModel.rawAttributes.QuestionAsked.type.key = _responseDtoModel.rawAttributes.QuestionAsked.type.key.toString();
    _responseDtoModel.rawAttributes.Answer.value = responseDomainModel.getAnswer();
    _responseDtoModel.rawAttributes.Answer.type.key = _responseDtoModel.rawAttributes.Answer.type.key.toString();
    _responseDtoModel.rawAttributes.Value.value = responseDomainModel.getValue();
    _responseDtoModel.rawAttributes.Value.type.key = _responseDtoModel.rawAttributes.Value.type.key.toString();
    _responseDtoModel.rawAttributes.UTCDateCreated.value = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    _responseDtoModel.rawAttributes.UTCDateCreated.type.key =  _responseDtoModel.rawAttributes.UTCDateCreated.type.key.toString();
   
    let clonedAttributes = JSON.parse(JSON.stringify(_responseDtoModel.rawAttributes));
    return clonedAttributes;
}

//#ENDREGION Private Functions