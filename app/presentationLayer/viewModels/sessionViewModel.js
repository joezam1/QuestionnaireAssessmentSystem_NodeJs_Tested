const formFieldStatus = require('../../servicesLayer/enumerations/formFieldStatus.js');
const jsDataType = require('../../servicesLayer/stringLiterals/jsDataType.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');

const sessionViewModel = function(model){

    let userId = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.userId ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    let sessionToken = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.sessionToken ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.STRING
    };
    let expires = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.expires ): 0,
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.NUMBER
    }

    let data = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.data ): {},
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.OBJECT
    };

    let isActive = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.isActive ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.BOOLEAN
    };

    let utcDateCreated = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.utcDateCreated ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.DATE
    };

    let utcDateExpired = {
        fieldValue: inputCommonInspector.objectIsValid(model) ? (model.utcDateExpired ): '',
        fieldStatus: formFieldStatus.Required,
        fieldDataType: jsDataType.DATE
    };



    return {
        userId: userId,
        sessionToken : sessionToken,
        expires : expires,
        data : data,
        isActive : isActive,
        utcDateCreated : utcDateCreated,
        utcDateExpired : utcDateExpired
    }
}

module.exports = sessionViewModel;