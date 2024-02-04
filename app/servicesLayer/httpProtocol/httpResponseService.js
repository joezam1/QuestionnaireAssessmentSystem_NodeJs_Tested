const httpResponseStatusCode = require('./httpResponseStatusCode.js');
const httpResponseStatus = require('../enumerations/httpResponseStatus.js');
const inputCommonInspector = require('../validation/inputCommonInspector.js');
const httpResponseHelper = require('./httpResponseHelper.js');
const monitorService = require('../monitoring/monitorService.js');


const setServerResponseCookies = function (cookiesArray) {
    for (let a = 0; a < cookiesArray.length; a++) {
        let cookieObj = cookiesArray[a];
        httpResponseHelper.setCookie(_httpResponse, cookieObj);
    }
}

const setServerResponseHeaders = function (headersArray) {

    for (let a = 0; a < headersArray.length; a++) {
        let headerObj = headersArray[a];
        httpResponseHelper.setHeader(_httpResponse, headerObj);

    }
}

const getResponseResultStatus = function (resultObj, statusCode) {
    const responseObj = getResponseStatusObject(statusCode);

    const obj = {
        result: resultObj,
        status: responseObj.code,
        statusText: responseObj.statusText
    }

    return obj;
}

const sendHttpResponse = function (_httpResponse, resultObj) {
    monitorService.capture('sendHttpResponse_httpResponse');
    try{
        if (inputCommonInspector.inputExist(resultObj) && inputCommonInspector.inputExist(resultObj.status)) {
            httpResponseHelper.executeSend(_httpResponse, resultObj.status, resultObj);
        } else {
            httpResponseHelper.executeSend(_httpResponse, httpResponseStatus._404notFound, resultObj);
        }
        return;
    }
    catch (error) {
        let err = new Error(error);
        console.log('Error WHILE Sending HTTP Response');
        console.log('sendHttpResponse-TRY-CATCH-error', err);
        return;
    }
}


const httpResponseService = Object.freeze({
    setServerResponseHeaders: setServerResponseHeaders,
    setServerResponseCookies: setServerResponseCookies,
    getResponseResultStatus: getResponseResultStatus,
    sendHttpResponse: sendHttpResponse
});

module.exports = httpResponseService;

//#REGION Private Functions

function getResponseStatusObject(statusCode) {

    let responseObj = {
        code: httpResponseStatusCode.unprocessableEntity422.code,
        statusText: httpResponseStatusCode.unprocessableEntity422.statusText
    };

    for (let key in httpResponseStatusCode) {
        if (httpResponseStatusCode.hasOwnProperty(key)) {
            let valObj = httpResponseStatusCode[key];
            if (valObj.code === statusCode) {
                responseObj = valObj;
                break;
            }
        }
    }
    return responseObj;
}

//#ENDREGION Private Functions
