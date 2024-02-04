const dbContext = require('../mysqlDataStore/context/dbContext.js');
const helpers = require('../../servicesLayer/common/helpers.js');
const registerDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/registerDtoModelFactory.js');
const dtoModelEnum = require('../../servicesLayer/enumerations/dtoModel.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');
const sqlStatementManager = require('../mysqlDataStore/statementResolvers/sqlStatementManager.js');
const genericQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js'); 

let _context = null;
let _registerTableName = null;


const insertRegisterIntoTableTransactionAsync = async function(connectionPool, registerDomainModel){

    const paramOptions = new parameterOptions();
    paramOptions.parameterObject = registerDomainModel;
    const registerDtoModel = registerDtoModelFactory.createRegisterDtoModel(dtoModelEnum.RegisterDtoModel_MappedFromDomain, paramOptions )
   
    let propertiesArray = helpers.createPropertiesArrayFromObjectProperties(registerDtoModel);
    let statementResult = sqlStatementManager.resolveSingleConnectionStatementAsync(propertiesArray, genericQueryStatement.insertIntoTableValues, _registerTableName, connectionPool);

    return statementResult;

}

onInit();

const registerRepository = Object.freeze({
    insertRegisterIntoTableTransactionAsync : insertRegisterIntoTableTransactionAsync,
});

module.exports = registerRepository;

//REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
    _registerTableName = dbContext.getActiveDatabaseName() + '.' + _context.RegisterDtoModel.tableName;
}

//ENDREGION Private Functions