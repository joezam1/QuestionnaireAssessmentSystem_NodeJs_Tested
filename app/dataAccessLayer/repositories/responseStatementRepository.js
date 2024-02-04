const dbContext = require('../mysqlDataStore/context/dbContext.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');
const responseStatementDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/responseStatementDtoModelFactory.js');
const dtoModel = require('../../servicesLayer/enumerations/dtoModel.js');
const genericSqlQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');
const sqlStatementManager = require('../mysqlDataStore/statementResolvers/sqlStatementManager.js');
const helpers = require('../../servicesLayer/common/helpers.js');
const genericQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');

let _context = null;
let _responseStatementTableName = null;

onInit();


const getResponseStatementByIdAsync = async function(responseStatementDomainModel){
    const paramOptions = new parameterOptions();
    paramOptions.parameterObject = responseStatementDomainModel;
    const responseStatementDtoModel =  responseStatementDtoModelFactory.createResponseStatementDtoModel( dtoModel.ResponseStatementDtoModel_MappedFromDomain,paramOptions );

    
    let propertiesArray = [responseStatementDtoModel.ResponseStatementId];
    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.selectWherePropertyEqualsAnd, _responseStatementTableName);
    console.log('statementResult: ' , statementResult);
    if (statementResult instanceof Error) {
        return statementResult;
    }
    paramOptions.parameterArray = statementResult[0];
    let responseStatementDtoModelResult = responseStatementDtoModelFactory.createResponseStatementDtoModel(dtoModel.ResponseStatementDtoModel_MappedFromDatabase ,paramOptions );
    return responseStatementDtoModelResult;
}


const insertResponseStatementIntoTableTransactionAsync  = async function(connectionPool , responseStatementDomainModel){

    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = responseStatementDomainModel;
    const responseStatementDtoModel =  responseStatementDtoModelFactory.createResponseStatementDtoModel( dtoModel.ResponseStatementDtoModel_MappedFromDomain, paramOptions );

    let propertiesArray = helpers.createPropertiesArrayFromObjectProperties(responseStatementDtoModel);
    let statementResult = await sqlStatementManager.resolveSingleConnectionStatementAsync(propertiesArray, genericQueryStatement.insertIntoTableValues, _responseStatementTableName, connectionPool);
   
    return statementResult;
}


const responseStatementRepository = Object.freeze({
    getResponseStatementByIdAsync : getResponseStatementByIdAsync,
    insertResponseStatementIntoTableTransactionAsync : insertResponseStatementIntoTableTransactionAsync
});

module.exports = responseStatementRepository;


//#REGION Private Functions
function onInit() {
    _context = dbContext.getSequelizeContext();
    _responseStatementTableName = dbContext.getActiveDatabaseName() + '.' + _context.ResponseStatementDtoModel.tableName;
}

//#ENDREGION Private Functions