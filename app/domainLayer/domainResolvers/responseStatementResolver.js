const dbAction = require('../../dataAccessLayer/mysqlDataStore/context/dbAction.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');
const responseStatementRepository = require('../../dataAccessLayer/repositories/responseStatementRepository.js');
const responseRepository = require('../../dataAccessLayer/repositories/responseRepository.js');
const monitorService = require('../../servicesLayer/monitoring/monitorService.js');

const saveResponseStatementAndResponsesToDatabaseAsync = async function(responseStatementDomainModel, responseDomainModelArray){

    const singleConnection = await dbAction.getSingleConnectionFromPoolPromiseAsync();

    try{

        await dbAction.beginTransactionSingleConnectionAsync(singleConnection);

        const insertedResponseStatementResult = await responseStatementRepository.insertResponseStatementIntoTableTransactionAsync(singleConnection, responseStatementDomainModel);

        if (insertedResponseStatementResult instanceof Error) {
            dbAction.rollbackTransactionSingleConnection(singleConnection);
            return httpResponseService.getResponseResultStatus(insertedResponseStatementResult, httpResponseStatus._400badRequest);
        }
    
        const responseInsertedResult = await responseRepository.insertMultipleResponsesRowsIntoTableTransactionAsync(singleConnection, responseDomainModelArray);
        if (responseInsertedResult instanceof Error) {
            dbAction.rollbackTransactionSingleConnection(singleConnection);
            return httpResponseService.getResponseResultStatus(responseInsertedResult, httpResponseStatus._400badRequest);
        }

        dbAction.commitTransactionSingleConnection(singleConnection);
        return httpResponseService.getResponseResultStatus(insertedResponseStatementResult, httpResponseStatus._201created);


    }
    catch(exception){
        console.log('exception: ', exception);
        monitorService.capture('saveResponseStatementAndResponsesToDatabaseAsync: exception ', exception)
        dbAction.rollbackTransactionSingleConnection(singleConnection);
        return httpResponseService.getResponseResultStatus(exception, httpResponseStatus._400badRequest);
    }
}




const responseStatementResolver = Object.freeze({
    saveResponseStatementAndResponsesToDatabaseAsync : saveResponseStatementAndResponsesToDatabaseAsync
});


module.exports = responseStatementResolver;