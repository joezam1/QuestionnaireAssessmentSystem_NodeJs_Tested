const formFieldStatus = require('../../servicesLayer/enumerations/formFieldStatus.js');
const jsDataType = require('../.././servicesLayer/validation/inputCommonInspector.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');


const userLoginViewModel = function(model){

    let email = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.email ) : '',
        fieldStatus:formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    
    let password = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.password ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };

    return {
        email:email,
        password:password
    }
}

module.exports = userLoginViewModel;