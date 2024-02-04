const dbContext = require('../mysqlDataStore/context/dbContext.js');
const userDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/userDtoModelFactory.js');
const userRoleDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/userRoleDtoModelFactory.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');
const dtoModelEnum = require('../../servicesLayer/enumerations/dtoModel.js');
const sqlStatementManager = require('../mysqlDataStore/statementResolvers/sqlStatementManager.js');
const genericSqlQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');
const monitorService = require('../../servicesLayer/monitoring/monitorService.js');
const helpers = require('../../servicesLayer/common/helpers.js');
const genericQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');


let _context = null;
let _userTableName = null;
let _userRoleTableName = null;

onInit();
//Test: DONE
const getUserByUsernameAndEmailDataAsync = async function (userDomainModel) {
    monitorService.capture('context', _context);
    monitorService.capture('userTableName', _userTableName);
    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = userDomainModel;
    let userDtoModel = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDomain, paramOptions);

    let propertiesArray = [userDtoModel.Username, userDtoModel.Email];
    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.selectWherePropertyEqualsAnd, _userTableName);
    
    if (statementResult instanceof Error) {
        return statementResult;
    }
    paramOptions.parameterArray = statementResult[0];
    let userDtoModelResult = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDatabase ,paramOptions );
    return userDtoModelResult;
}


const getUserByEmailDataAsync = async function (userDomainModel) {
    monitorService.capture('context', _context);
    monitorService.capture('userTableName', _userTableName);
    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = userDomainModel;
    let userDtoModel = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDomain, paramOptions);

    let propertiesArray = [userDtoModel.Email];
    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.selectWherePropertyEqualsAnd, _userTableName);
    
    if (statementResult instanceof Error) {
        return statementResult;
    }
    paramOptions.parameterArray = statementResult[0];
    let userDtoModelResult = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDatabase ,paramOptions );
    return userDtoModelResult;

}


const getUserByUserIdAsync = async function (userDomainModel) {
    monitorService.capture('context', _context);
    monitorService.capture('userTableName', _userTableName);
    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = userDomainModel;
    let userDtoModel = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDomain, paramOptions);

    let propertiesArray = [userDtoModel.UserId];
    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.selectWherePropertyEqualsAnd, _userTableName);
    console.log('statementResult: ' , statementResult);
    if (statementResult instanceof Error) {
        return statementResult;
    }
    paramOptions.parameterArray = statementResult[0];
    let userDtoModelResult = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDatabase ,paramOptions );
    return userDtoModelResult;

}


//Test: DONE
const insertUserIntoTableTransactionAsync = async function (connectionPool, userDomainModel) {
    monitorService.capture('userDomainModel', userDomainModel);
    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = userDomainModel;
    let userDtoModel = userDtoModelFactory.createUserDtoModel(dtoModelEnum.UserDtoModel_MappedFromDomain , paramOptions );
    let propertiesArray = helpers.createPropertiesArrayFromObjectProperties(userDtoModel);
    let statementResult = await sqlStatementManager.resolveSingleConnectionStatementAsync(propertiesArray, genericQueryStatement.insertIntoTableValues, _userTableName, connectionPool);
   
    return statementResult;
}

//Test: DONE
const insertUserRoleIntoTableTransactionAsync = async function (connectionPool, userRoleDomainModel) {
    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = userRoleDomainModel;
    let userRoleDtoModel = userRoleDtoModelFactory.createUserRoleDtoModel(dtoModelEnum.UserRoleDtoModel_MappedFromDomain , paramOptions);
    let propertiesArray = helpers.createPropertiesArrayFromObjectProperties(userRoleDtoModel);
    let statementResult = await sqlStatementManager.resolveSingleConnectionStatementAsync(propertiesArray, genericQueryStatement.insertIntoTableValues, _userRoleTableName, connectionPool);

    return statementResult;
}





const userRepository = Object.freeze({
    getUserByUsernameAndEmailDataAsync: getUserByUsernameAndEmailDataAsync,
    getUserByEmailDataAsync : getUserByEmailDataAsync,
    getUserByUserIdAsync : getUserByUserIdAsync,
    insertUserIntoTableTransactionAsync : insertUserIntoTableTransactionAsync,
    insertUserRoleIntoTableTransactionAsync : insertUserRoleIntoTableTransactionAsync
    
});

module.exports = userRepository;


//#REGION Private Functions
function onInit() {
    _context = dbContext.getSequelizeContext();
    _userTableName = dbContext.getActiveDatabaseName() + '.' + _context.UserDtoModel.tableName;
    _userRoleTableName = dbContext.getActiveDatabaseName() + '.' + _context.UserRoleDtoModel.tableName;
}

//#ENDREGION Private Functions
