const formFieldStatus = require('../../servicesLayer/enumerations/formFieldStatus');
const jsDataType = require('../../servicesLayer/stringLiterals/jsDataType.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');



const responseStatementViewModel = function(model){

    const responseStatementId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.ResponseStatementId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const name = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.Name ) : '',
        fieldStatus:formFieldStatus.Optional,
        fieldDataType: jsDataType.STRING
    };

    const questionnaireId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.QuestionnaireId ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const userId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.UserId) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    return Object.freeze({
        responseStatementId : responseStatementId,
        name : name,
        questionnaireId : questionnaireId,
        userId : userId
    });

}


module.exports = responseStatementViewModel;