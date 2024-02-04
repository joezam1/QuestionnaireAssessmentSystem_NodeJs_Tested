const Sequelize = require('sequelize');
const mysql = require('mysql2');

const helpers = require('../../../servicesLayer/common/helpers.js');
const inputCommonInspector = require('../../../servicesLayer/validation/inputCommonInspector.js');



//Test: DONE
const getTruthySequelizeAttributesValues = function (sequelizeAttributesArray){
    let truthyValues = [];

    for(a = 0; a< sequelizeAttributesArray.length; a++){
        if(sequelizeAttributesArray[a]){
            for(let key in sequelizeAttributesArray[a]){
                let _isOwnProperty =  sequelizeAttributesArray[a].hasOwnProperty(key)
                let selectedKey = key.toLowerCase();
                if(_isOwnProperty && selectedKey === 'value') {
                
                    let value = sequelizeAttributesArray[a][key];       
                    let exist = inputCommonInspector.inputExist(value);
                    if(exist){
                        truthyValues.push(sequelizeAttributesArray[a]);  
                    }                                                  
                }
            }
        }
    }

    return truthyValues;
}

//Test: DONE
const getSanitizedInputs = function(sequelizeAttributesArray){
    let sanitizedInputsArray = [];
    for(var a = 0; a<sequelizeAttributesArray.length; a++)
    {
        let obj = sequelizeAttributesArray[a];
        let sanitizedInput = sanitizeInput(obj.value, obj.type.key);
        sanitizedInputsArray.push(sanitizedInput);
    }
    return sanitizedInputsArray;
}


let service = {
    getTruthySequelizeAttributesValues : getTruthySequelizeAttributesValues,
    getSanitizedInputs: getSanitizedInputs
}

module.exports = service;


//#REGION Private Functions

let sanitizeInput = function (input, sequelizeModelPropertyType) {

    let escapedValue = '';
    let clearedValue =   '';
    let sanitizedValue = '';
    let trimmedImput = helpers.removeLeadingAndTrailingSpaces(input);

    switch(sequelizeModelPropertyType){

        case Sequelize.DataTypes.STRING.key:
        case Sequelize.DataTypes.TEXT.key:
            escapedValue = mysql.escape(trimmedImput);
            clearedValue = removeExtraQuotes(escapedValue);
            sanitizedValue = (clearedValue.toLowerCase() === 'null' ) ? null: clearedValue;
            break;

        case Sequelize.DataTypes.INTEGER.key:
            let parsedInteger = parseInt(trimmedImput);
            escapedValue = mysql.escape(parsedInteger);
            sanitizedValue = removeExtraQuotes(escapedValue);
            break;

        case Sequelize.DataTypes.DECIMAL.key:
        case Sequelize.DataTypes.DOUBLE.key:
        case Sequelize.DataTypes.FLOAT.key:
            let parsedFloat = parseFloat(trimmedImput)
            escapedValue = mysql.escape(parsedFloat);
            sanitizedValue = removeExtraQuotes(escapedValue);
            break;

        case Sequelize.DataTypes.DATE.key:
            escapedValue = mysql.escape(trimmedImput);
            clearedValue = removeExtraQuotes(escapedValue);
            sanitizedValue = (clearedValue.toLowerCase() === 'null' ) ? null: clearedValue;
            break;

        case Sequelize.DataTypes.UUID.key:
            escapedValue = mysql.escape(trimmedImput);
            sanitizedValue = removeExtraQuotes(escapedValue);
            break;

        case Sequelize.DataTypes.BOOLEAN.key:
            escapedValue = mysql.escape(trimmedImput);
            let valueNosingleQuotes = removeExtraQuotes(escapedValue);
            sanitizedValue = (valueNosingleQuotes === 'true');
            break;
    }

    return sanitizedValue;
}

function removeExtraQuotes(input){
    let valueNoQuotes = input.replace(/[''']+/g, '');
    let clearedValue = valueNoQuotes.replace(/['"']+/g, '');
    return clearedValue;
}

//#ENDREGION Private Functions