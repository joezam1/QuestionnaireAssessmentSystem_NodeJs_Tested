const sessionRepository = require('../../dataAccessLayer/repositories/sessionRepository.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');
const monitorService = require('../../servicesLayer/monitoring/monitorService.js');

const sessionDomainModelFactory = require('../domainFactories/sessionDomainModelFactory.js');
const sessionViewModelFactory = require('../../presentationLayer/viewModelFactories/sessionViewModelFactory.js');
const domainModelEnum = require('../../servicesLayer/enumerations/domainModel.js');
const viewModelEnum = require('../../servicesLayer/enumerations/viewModel.js');
const sessionConfig = require('../../../configuration/authentication/sessionConfig.js');
const sessionService = require('../../servicesLayer/authentication/sessionService.js');
const messageService = require('../../servicesLayer/messages/messageService.js');






//Test: DONE
const insertSessionIntoDatabaseAsync = async function(sessionModel){
   
    try{
        console.log('sessionModel:' , sessionModel);
        let insertedSessionResult = await sessionRepository.insertSessionIntoTableAsync (sessionModel);

        if(insertedSessionResult.statementResult instanceof Error){            
            return httpResponseService.getResponseResultStatus(insertedSessionResult, httpResponseStatus._400badRequest );
        }

        return httpResponseService.getResponseResultStatus(insertedSessionResult, httpResponseStatus._201created ); 
    }
    catch(error){
        monitorService.capture('insertSessionSessionActivityAndTokenTransactionAsync: error ', error)      
        return httpResponseService.getResponseResultStatus(error , httpResponseStatus._400badRequest );
    }
}


//Test: DONE
const getSessionInfoAsync = async function(bearerSessionToken){
    
    const currentSessionTokenArray = bearerSessionToken.split(' ');
    let lastIndex = currentSessionTokenArray.length-1;
    const objModel = {
        userId : null, 
        sessionToken : currentSessionTokenArray[lastIndex], 
        data : null, 
        expirationTimeMilliseconds : sessionConfig.SESSION_EXPIRATION_TIME_IN_MILLISECONDS
    }
    const tempSessionModel = sessionDomainModelFactory.createDomainModel(domainModelEnum.SessionModel ,objModel );  

    const sessionsDtoModelResultArray = await sessionRepository.getSessionFromDatabaseAsync(tempSessionModel);
    monitorService.capture('sesionsDtoModelResultArray', sessionsDtoModelResultArray);

    if (sessionsDtoModelResultArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(sessionsDtoModelResultArray, httpResponseStatus._400badRequest);
    }
    else if (sessionsDtoModelResultArray.length === 0) {
        return httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._401unauthorized);
    }

    const currentSessionDtoModel = sessionsDtoModelResultArray[0];

    if(!currentSessionDtoModel.IsActive.value){
        return httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._401unauthorized);
    }

    if(sessionService.isSessionExpired(currentSessionDtoModel.UTCDateExpired.value)){

        const resultSessionExpired = await resolveSetExpiredSessionAsInactiveInDatabaseAsync(currentSessionDtoModel);
        return resultSessionExpired;
    }else
    {
        const currentSessionViewModel = sessionViewModelFactory.createViewModel(viewModelEnum.SessionViewModel_MappedFromSessionDtoModel ,currentSessionDtoModel );  
        return httpResponseService.getResponseResultStatus(currentSessionViewModel, httpResponseStatus._200ok);
    }
}


const setActiveSessionAsInactiveInDatabaseAsync =async function(sessionDomainModel){
    let sessionResultArray = await sessionRepository.updateSessionTableSetIsActiveColumnValueInDatabaseAsync (sessionDomainModel);
    if (sessionResultArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(sessionResultArray, httpResponseStatus._400badRequest);
    }

    return httpResponseService.getResponseResultStatus(messageService.sessionNoLongerActive, httpResponseStatus._200ok);
}

const sessionDomainManager = Object.freeze({
    insertSessionIntoDatabaseAsync : insertSessionIntoDatabaseAsync,
    getSessionInfoAsync :getSessionInfoAsync,
    setActiveSessionAsInactiveInDatabaseAsync: setActiveSessionAsInactiveInDatabaseAsync
});

module.exports = sessionDomainManager;


//#REGION Private Functions
async function resolveSetExpiredSessionAsInactiveInDatabaseAsync(sessionDtoModel){

    sessionDtoModel.IsActive.value = false;
    const currentSessionDomainModel = sessionDomainModelFactory.createDomainModel(domainModelEnum.SessionDomainModel_MappedFromSessionDtoModel, sessionDtoModel);
    let sessionResultArray = await sessionRepository.updateSessionTableSetIsActiveColumnValueInDatabaseAsync (currentSessionDomainModel);
    if (sessionResultArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(sessionResultArray, httpResponseStatus._400badRequest);
    }

    return httpResponseService.getResponseResultStatus(messageService.sessionExpired, httpResponseStatus._401unauthorized);
}


//#ENDREGION Private Functions 