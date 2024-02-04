const formFieldStatus = require('../../servicesLayer/enumerations/formFieldStatus.js');
const jsDataType = require('../../servicesLayer/stringLiterals/jsDataType.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');

const userRegisterViewModel = function(model){
    const firstName ={
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.firstName ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    const middleName = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.middleName ) : '',
        fieldStatus:formFieldStatus.Optional,
        fieldDataType: jsDataType.STRING
    };
    const lastName = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.lastName ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    const username = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.username ) : '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    const email = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.email ) : '',
        fieldStatus:formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    const password = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.password ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    const confirmPassword = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.confirmPassword ) : '',
        fieldStatus:formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    const sex = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.sex) : '',
        fieldStatus:formFieldStatus.Required,
        fieldDataType: jsDataType.NUMBER
    };

    return Object.freeze({
        firstName:firstName,
        middleName:middleName,
        lastName:lastName,
        username:username,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
        sex:sex
    });

}

module.exports = userRegisterViewModel;