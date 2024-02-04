const dbContext = require('../mysqlDataStore/context/dbContext.js');
const dbAction = require('../mysqlDataStore/context/dbAction.js');
const sqlQueryFactory = require('../mysqlDataStore/preparedStatements/sqlQueryFactory.js');
const dtoModel = require('../../servicesLayer/enumerations/dtoModel.js');
const roleDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/roleDtoModelFactory.js');
const genericQqlQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');
const parameterOptions = require('../../dataAccessLayer/mysqlDataStore/dtoModelsFactories/parameterOptions.js');

let _context = '';
let _roleTableName = '';

onInit();
//Test: DONE
const getAllRolesAsync = async function(){
    let selectStatement = sqlQueryFactory.createSimpleQueryStatement(genericQqlQueryStatement.selectAllFromTable ,_roleTableName);
    let statementResult = await dbAction.executeStatementAsync(selectStatement);
    if(statementResult instanceof Error){
        return statementResult;
    }

    let paramOptions = new parameterOptions();
    paramOptions.parameterArray = statementResult[0];
    let rolesDtoResult = roleDtoModelFactory.createRoleDtoModel(dtoModel.RoleDtoModel_MappedFromDatabase, paramOptions);
    
    return rolesDtoResult;
}



const roleRepository = Object.freeze({
    getAllRolesAsync : getAllRolesAsync
});

module.exports = roleRepository;

//#REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
    const _roleDto = _context.RoleDtoModel;
    _roleTableName = dbContext.getActiveDatabaseName() + '.' + _roleDto.tableName;
}

//#ENDREGION Private Functions