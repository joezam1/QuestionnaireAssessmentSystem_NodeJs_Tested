const dbContext = require('../mysqlDataStore/context/dbContext.js');
const monitorService = require('../../servicesLayer/monitoring/monitorService.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');
const responseDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/responseDtoModelFactory.js');
const dtoModel = require('../../servicesLayer/enumerations/dtoModel.js');
const helpers = require('../../servicesLayer/common/helpers.js');
const sqlStatementManager = require('../mysqlDataStore/statementResolvers/sqlStatementManager.js');
const genericQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');

let _context = null;
let _responseTableName = null;

onInit();

const insertMultipleResponsesRowsIntoTableTransactionAsync = async function (connectionPool, responseDomainModelArray) {
    monitorService.capture('responseDomainModelArray', responseDomainModelArray);
    let paramOptions = new parameterOptions();

    let responseDtoModelArray = [];
    let responsePropertiesArrayOfRows = [];
    for(let a = 0; a < responseDomainModelArray.length; a++){
        paramOptions.parameterObject = responseDomainModelArray[a];
        let responseDtoModel = responseDtoModelFactory.createResponseDtoModel(dtoModel.ResponseDtoModel_MappedFromDomain,paramOptions );
        responseDtoModelArray.push(responseDtoModel);
        let responsePropertiesArray = helpers.createPropertiesArrayFromObjectProperties(responseDtoModel);
        responsePropertiesArrayOfRows.push(responsePropertiesArray);
    }
   
    let statementResult = await sqlStatementManager.resolveSingleConnectionInsertMultipleRowsSqlStatementAsync(responsePropertiesArrayOfRows, genericQueryStatement.insertMultipleRowsIntoTableValues, _responseTableName, connectionPool);
   
    return statementResult;
}


const responseRepository = Object.freeze({
    insertMultipleResponsesRowsIntoTableTransactionAsync :insertMultipleResponsesRowsIntoTableTransactionAsync
});

module.exports = responseRepository;

//#REGION Private Functions
function onInit() {
    _context = dbContext.getSequelizeContext();
    _responseTableName = dbContext.getActiveDatabaseName() + '.' + _context.ResponseDtoModel.tableName;
}

//#ENDREGION Private Functions