const helpers = require('../common/helpers.js');

const setHeader = function(response, headerObj){

    response.set(headerObj.key, headerObj.value);
}

const setCookie = function(response, cookieObj){

    response.cookie(cookieObj.name, JSON.stringify(cookieObj.data), cookieObj.properties);
}

const executeSend = function(response, status, resultObj ){

    resultObj.result = (resultObj.result instanceof Error ) ? helpers.composeErrorObjectToStringify(resultObj.result) : resultObj.result;
    const resultJson = JSON.stringify( resultObj );
    response.status(status).send(resultJson);
    return;
}



const httpResponseHelper = Object.freeze({
    setHeader : setHeader,
    setCookie : setCookie,
    executeSend : executeSend
});

module.exports = httpResponseHelper;
