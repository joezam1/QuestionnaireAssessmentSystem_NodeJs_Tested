const dbContext = require('../mysqlDataStore/context/dbContext.js');
const sqlQueryFactory = require('../mysqlDataStore/preparedStatements/sqlQueryFactory.js');
const genericQqlQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');
const dbAction = require('../mysqlDataStore/context/dbAction.js');
const categoryDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/categoryDtoModelFactory.js');
const dtoModel = require('../../servicesLayer/enumerations/dtoModel.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');

let _context = '';
let _categoryTableName = '';

onInit();
//Test: DONE
let getAllCategoriesAsync = async function(){
    let selectStatement = sqlQueryFactory.createSimpleQueryStatement(genericQqlQueryStatement.selectAllFromTable ,_categoryTableName);
    let statementResult = await dbAction.executeStatementAsync(selectStatement);
    if(statementResult instanceof Error){
        return statementResult;
    }

    let paramOptions = new parameterOptions();
    paramOptions.parameterArray = statementResult[0];
    let categoriesDtoResult = categoryDtoModelFactory.createCategoryDtoModel (dtoModel.CategoriesDtoModel_MappedFromDatabase , paramOptions); 

    return categoriesDtoResult;
}


const categoryRepository = Object.freeze({
    getAllCategoriesAsync : getAllCategoriesAsync
});

module.exports = categoryRepository;

//#REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
    _categoryTableName = dbContext.getActiveDatabaseName() + '.' +  _context.CategoryDtoModel.tableName;
}



//#ENDREGION Private Functions