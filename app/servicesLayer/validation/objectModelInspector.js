const helpers = require('../common/helpers.js');

const inputCommonInspector = require('./inputCommonInspector.js');
const inputTypeInspector = require('./inputTypeInspector.js');
const inputValueInspector = require('./inputValueInspector');

const validationConfig = require('../../../configuration/validation/validationConfig.js');
const formFieldStatus = require('../enumerations/formFieldStatus.js');
const jsDataType = require('../stringLiterals/jsDataType.js');
const inputValidationSuffix = require('../stringLiterals/inputValidationSuffix.js');

//Test: DONE
const inspectInputLength = function(objViewModel){
    let inputLengthReport = {};
    for(var key in objViewModel){
        if(!objViewModel.hasOwnProperty(key)){
            continue;
        }
        let value = objViewModel[key].fieldValue;
        let fieldStatus = objViewModel[key].fieldStatus;

        if(fieldStatus === formFieldStatus.Required && inputCommonInspector.stringIsNullOrEmpty(value)){
            let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(key);
            inputLengthReport[`${key + inputValidationSuffix.REQUIRED}`] = `${allCapitalLettersKey} is empty. ${allCapitalLettersKey} is Required`;
        }
    }
    return inputLengthReport;
}

//Test: DONE
const inspectInputType = function(objViewModel){
    let reportTypeErrors = {};
    for(let key in objViewModel){
        if(objViewModel.hasOwnProperty(key)){
            let selectedDataType = objViewModel[key].fieldDataType;
            switch(selectedDataType){
                case jsDataType.STRING:
                if(!inputTypeInspector.isTypeString(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + inputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case jsDataType.DATE:
                if(!inputTypeInspector.isDate(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + inputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case jsDataType.NUMBER:
                if(!inputTypeInspector.isTypeNumber(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + inputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case jsDataType.BOOLEAN:
                if(!inputTypeInspector.isTypeBoolean(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + inputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;

                case jsDataType.OBJECT:
                if(!inputTypeInspector.isTypeObject(objViewModel[key].fieldValue)){
                    reportTypeErrors[`${key + inputValidationSuffix.DATATYPE}`] = getReportErrorInputType(objViewModel, key);
                }
                break;
            }
        }
    }
    return reportTypeErrors;
}

//Test: DONE
const inspectInputValue = function(objViewModel){
    let dataReportErrors = {};
    let selectedPassword = '';
    for(let key in objViewModel){
        if(objViewModel.hasOwnProperty(key)){            

            if(key.toLowerCase() ===('username')){
                let value = objViewModel[key].fieldValue;
                if(!inputValueInspector.usernameIsValid(value)){
                    let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + inputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} is Invalid`;
                }
            }

            else if(key.toLowerCase().includes('name')){
                let value = objViewModel[key].fieldValue;
                if(!inputValueInspector.nameIsValid(value)){
                    let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + inputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} is Invalid`;
                }
            }


            else if(key.toLowerCase().includes('email')){
                let value = objViewModel[key].fieldValue;
                if(!inputValueInspector.emailIsValid(value)){
                    let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + inputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} is Invalid`;
                }
            }

            else if(key.toLowerCase() === ('password')){
                selectedPassword = objViewModel[key].fieldValue;
                if(!inputValueInspector.passwordMinCharactersIsValid(selectedPassword, validationConfig.passwordMinCharacters)){
                    let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors[`${key + inputValidationSuffix.INVALID}`] = `${allCapitalLettersKey} must have ${validationConfig.passwordMinCharacters} minimum characters`;
                }
            }

            else if(key.toLowerCase() === ('confirmpassword')){
                let selectedConfirmPasswordValue = objViewModel[key].fieldValue;
                if(!inputValueInspector.passwordAndConfirmPasswordAreEqual(selectedPassword , selectedConfirmPasswordValue)){
                    let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(key);
                    dataReportErrors.confirmPasswordInvalid  = `Password and ${allCapitalLettersKey} are not the same`;
                }
            }
        }
    }
    return dataReportErrors;
}

const objectModelInspector = Object.freeze({
    inspectInputLength : inspectInputLength,
    inspectInputType : inspectInputType,
    inspectInputValue : inspectInputValue
});

module.exports = objectModelInspector;

//#REGION Private Functions
function getReportErrorInputType(userViewModel,key){
    let allCapitalLettersKey = helpers.formatStringFirstLetterCapital(  key );
    let reportValue =  `${allCapitalLettersKey} must be of type ${userViewModel[key].fieldDataType}`;

    return reportValue;
}

//#ENDREGION Private Functions
