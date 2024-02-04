const formFieldStatus = require('../../servicesLayer/enumerations/formFieldStatus.js');
const jsDataType = require('../../servicesLayer/stringLiterals/jsDataType.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');


const responseViewModel = function(model){


    const responseNumber = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.QuestionNumber ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.NUMBER
    };

    const responseIndex = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.Index ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.NUMBER
    };

    const responseStatementId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.ResponseStatementId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const userId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.UserId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const questionChoiceId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.QuestionChoiceId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const questionId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.QuestionId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const choiceId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.ChoiceId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const questionAsked = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.QuestionText ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const answer = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.ChoiceText ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const value = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.ChoiceValue ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.NUMBER
    };

    return Object.freeze({

        responseNumber : responseNumber,
        responseIndex : responseIndex,
        responseStatementId : responseStatementId,
        userId : userId,
        questionChoiceId : questionChoiceId,
        questionId : questionId,
        choiceId : choiceId,
        questionAsked : questionAsked,
        answer : answer,
        value : value
    });
}


module.exports = responseViewModel;