const dbContext = require('../mysqlDataStore/context/dbContext.js');
const sessionDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/sessionDtoModelFactory.js');
const dtoModelEnum = require('../../servicesLayer/enumerations/dtoModel.js');
const helpers = require('../../servicesLayer/common/helpers.js');
const sqlStatementManager = require('../mysqlDataStore/statementResolvers/sqlStatementManager.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');
const monitorService = require('../../servicesLayer/monitoring/monitorService.js');
const genericSqlQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');

let _context = null;
let _sessionTableName = null;


onInit();

//Test: DONE
const insertSessionIntoTableAsync = async function ( sessionDomainModel ) {
    monitorService.capture('context', _context);
    monitorService.capture('sessionTableName', _sessionTableName);
    monitorService.capture('sessionDomainModel', sessionDomainModel);

    const paramOptions = new parameterOptions();
    paramOptions.parameterObject = sessionDomainModel;

    const sessionDtoModel = sessionDtoModelFactory.createSessionDtoModel(dtoModelEnum.SessionDtoModel_MappedFromDomain , paramOptions);

    monitorService.capture('sessionDtoModel: ', sessionDtoModel);
    let propertiesArray = helpers.createPropertiesArrayFromObjectProperties(sessionDtoModel);

    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.insertIntoTableValues, _sessionTableName);
   
    monitorService.capture('statementResult', statementResult);
    return Object.freeze({
        statementResult : statementResult,
        sessionDtoModel : sessionDtoModel
    });
}

const getSessionFromDatabaseAsync = async function(sessionDomainModel){
    monitorService.capture('context', _context);
    monitorService.capture('sessionTableName', _sessionTableName);
    const paramOptions = new parameterOptions();
    paramOptions.parameterObject = sessionDomainModel;

    const sessionDtoModel = sessionDtoModelFactory.createSessionDtoModel(dtoModelEnum.SessionDtoModel_MappedFromDomain , paramOptions);

    let propertiesArray = [sessionDtoModel.SessionToken];

    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.selectWherePropertyEqualsAnd, _sessionTableName);

    if (statementResult instanceof Error) {
        return statementResult;
    }
    const paramOptions1 = new parameterOptions();
    paramOptions1.parameterArray = statementResult[0];
    let sessionDtoResult = sessionDtoModelFactory.createSessionDtoModel(dtoModelEnum.SessionDtoModel_MappedFromDatabase, paramOptions1);

    return sessionDtoResult;
}

const updateSessionTableSetIsActiveColumnValueInDatabaseAsync = async function(sessionDomainModel){

    const paramOptions = new parameterOptions();
    paramOptions.parameterObject = sessionDomainModel;

    const sessionDtoModel = sessionDtoModelFactory.createSessionDtoModel(dtoModelEnum.SessionDtoModel_MappedFromDomain , paramOptions);

    const propertiesArray = [sessionDtoModel.IsActive];
    const conditionalPropertiesArray = [ sessionDtoModel.SessionId ];
    const statementResult = await sqlStatementManager.resolveUpdateWhereEqualsStatementAsync(propertiesArray, conditionalPropertiesArray, _sessionTableName);

    return statementResult;
} 

const sessionRepository = Object.freeze({
    insertSessionIntoTableAsync : insertSessionIntoTableAsync,
    getSessionFromDatabaseAsync:getSessionFromDatabaseAsync,
    updateSessionTableSetIsActiveColumnValueInDatabaseAsync:updateSessionTableSetIsActiveColumnValueInDatabaseAsync
});

module.exports = sessionRepository;

//#REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
    _sessionTableName = dbContext.getActiveDatabaseName() + '.' + _context.SessionDtoModel.tableName;
}

//#ENDREGION Private Functions