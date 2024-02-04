const sessionDomainManager = require('../domainLayer/domainManagers/sessionDomainManager.js');
const httpResponseStatus = require('../servicesLayer/enumerations/httpResponseStatus.js');
const httpResponseService = require('../servicesLayer/httpProtocol/httpResponseService.js');
const inputCommonInspector = require('../servicesLayer/validation/inputCommonInspector.js');
const messageService = require('../servicesLayer/messages/messageService.js');

const authenticationInspector = async function(request, response, next){

    console.log('request type: ', request);
    const accept = request.get('Accept');
    const contentType = request.get('Content-Type');
    const bearerSessionToken = request.get('Authorization');
    
    const requestEndpoint = request.originalUrl;
    switch(requestEndpoint){

        case '/api/users/register':
            next();
        break;

        case '/api/users/login':
            next();
        break;

        case '/api/users/logout':
            next();
        break;

        default:
            //Here we check the session token for private cases
            //if the token does not exist or is not active in database
            //we send the response 401: unauthorized to be logged out.
            
            if(!inputCommonInspector.stringIsValid(bearerSessionToken)){
                const userLogoutResult = httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._401unauthorized);  
                httpResponseService.sendHttpResponse(response, userLogoutResult);
                return;          
            }

            let sessionInfo = await sessionDomainManager.getSessionInfoAsync(bearerSessionToken);
            console.log('sessionInfo: ', sessionInfo);
            const currentSessionTokenArray = bearerSessionToken.split(' ');
            let lastIndex = currentSessionTokenArray.length-1;            
            
            if(sessionInfo.status == httpResponseStatus._200ok && currentSessionTokenArray[lastIndex] == sessionInfo.result.sessionToken.fieldValue){
                next();
                return;
            }
            const userLogoutResult = httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._401unauthorized);
            httpResponseService.sendHttpResponse(response, userLogoutResult);
            return;
    }   
}

module.exports = authenticationInspector;