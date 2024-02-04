const jsDataType = require('../stringLiterals/jsDataType.js');


const stringIsNullOrEmpty = function(input){
    if(valueIsUndefined(input)) {
        return false;
    }
    let isValidType = (typeof input === jsDataType.STRING || typeof input === jsDataType.OBJECT);
    let isValidValue = (input === null || (input !==null && input !== undefined && input.length === 0));

    if( (isValidType && isValidValue)){
        return true;
    }
    return false;
}

const objectIsNullOrEmpty = function(obj){
    let isObjectType = (typeof obj == jsDataType.OBJECT)
    let isArrayType = Array.isArray(obj);
    let isNotUndefinedType = typeof obj !== 'undefined';

    let isNullValue = ( obj === null)

    let isObject = ( isObjectType && !isArrayType && isNotUndefinedType );
    let isEmptyObj = ( isObject && !isNullValue && Object.keys(obj).length === 0 );

    let result =  (isObject && (isEmptyObj || isNullValue))
    return result;
}

const valueIsUndefined = function(value){
    let objUndefinedType = typeof value === 'undefined';
    let _valueIsUndefined = (value === undefined)
    let result = (objUndefinedType && _valueIsUndefined);
    return result;
}

const stringIsValid = function(inputStr){
    let isValidType = (typeof inputStr === jsDataType.STRING);
    let isNullOrEmpty = stringIsNullOrEmpty(inputStr);
    let isUndefined = valueIsUndefined(inputStr);
    if(isValidType && !isNullOrEmpty && !isUndefined) {
        return true;
    }
    return false;
}


const objectIsValid = function(obj){
    let isObjectType = (typeof obj == jsDataType.OBJECT)
    let isArrayType = Array.isArray(obj);
    let isNotUndefinedType = typeof obj !== 'undefined';
    let isValidType = (isObjectType && !isArrayType && isNotUndefinedType);
    let isNullOrEmpty = objectIsNullOrEmpty(obj);
    let isUndefined = valueIsUndefined(obj);
    if(isValidType && !isNullOrEmpty && !isUndefined) {
        return true;
    }
    return false;
}


const inputExist = function(input){
    if(input !== null && !valueIsUndefined(input)){
            return true;
    }
    return false;
}


const inputCommonInspector = Object.freeze({
    stringIsNullOrEmpty : stringIsNullOrEmpty,
    objectIsNullOrEmpty:objectIsNullOrEmpty,
    valueIsUndefined : valueIsUndefined,
    objectIsValid : objectIsValid,
    stringIsValid : stringIsValid,
    inputExist : inputExist
});

module.exports = inputCommonInspector;