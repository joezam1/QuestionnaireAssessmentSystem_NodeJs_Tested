//const dbAction = require( "../mysqlDataStore/context/dbAction.js");
const dbContext = require('../mysqlDataStore/context/dbContext.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');
const sectionDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/sectionDtoModelFactory.js');
const dtoModelEnum = require('../../servicesLayer/enumerations/dtoModel.js');
const sqlStatementManager = require('../mysqlDataStore/statementResolvers/sqlStatementManager.js');
const genericSqlQueryStatement = require('../../servicesLayer/enumerations/genericSqlQueryStatement.js');


let _context = null;
let _sectionTableName = null;

onInit();

//===

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
//===

const getAllSectionsByQuestionnaireIdAsync =async function(sectionDomainModel){
//const getAllSectionsByQuestionnaireIdAsync =async function(uuid){

   // const query = `SELECT * from Sections where QuestionnaireId = '${uuid}'`;
  //  let statementResult = await dbAction.executeStatementAsync(query);

    let paramOptions = new parameterOptions();
    paramOptions.parameterObject = sectionDomainModel;
    let sectionDtoModel = sectionDtoModelFactory.createSectionDtoModel(dtoModelEnum.SectionDtoModel_MappedFromDomain, paramOptions);

    let propertiesArray = [sectionDtoModel.QuestionnaireId];
    let statementResult = await sqlStatementManager.resolveStatementAsync(propertiesArray, genericSqlQueryStatement.selectWherePropertyEqualsAnd, _sectionTableName);
    if(statementResult instanceof Error){
        return statementResult;
    }

    paramOptions.parameterArray = statementResult[0];
    let allSectionsDtoModel = sectionDtoModelFactory.createSectionDtoModel(dtoModelEnum.SectionDtoModel_MappedFromDatabase,paramOptions);

    return allSectionsDtoModel;
}


const sectionRepository = Object.freeze({
    getAllSectionsByQuestionnaireIdAsync: getAllSectionsByQuestionnaireIdAsync
});

module.exports = sectionRepository;


//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
    _sectionTableName = dbContext.getActiveDatabaseName() + '.' + _context.SectionDtoModel.tableName;
}



//#RENDREGION Private Functions 