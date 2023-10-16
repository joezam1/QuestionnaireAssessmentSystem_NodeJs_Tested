const jsDataType = require('../stringLiterals/jsDataType.js');


const objectIsNullOrEmpty = function(obj){
    let isObjectType = (typeof obj == jsDataType.OBJECT)
    let isArrayType = Array.isArray(obj);
    let isNotUndefinedType = (typeof obj !== jsDataType.UNDEFINED);

    let isNullValue = ( obj === null)

    let isObject = ( isObjectType && !isArrayType && isNotUndefinedType );
    let isEmptyObj = ( isObject && !isNullValue && Object.keys(obj).length === 0 );

    let result =  (isObject && (isEmptyObj || isNullValue))
    return result;
}


const inputCommonInspector = Object.freeze({
    objectIsNullOrEmpty: objectIsNullOrEmpty
});

module.exports = inputCommonInspector;