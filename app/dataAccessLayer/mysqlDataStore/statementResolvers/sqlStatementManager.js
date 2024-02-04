
const valueSanitizer = require('../preparedStatements/sqlValueSanitizer.js');
const sqlQueryFactory = require('../preparedStatements/sqlQueryFactory.js');

const dbAction = require('../context/dbAction.js');
const monitorService = require('../../../servicesLayer/monitoring/monitorService.js');



//Test: DONE
const resolveStatementAsync = async function(propertiesArray , genericQueryStatementsEnum , tableName){
    let truthyPropertiesArray = valueSanitizer.getTruthySequelizeAttributesValues(propertiesArray);
    let queryStatement = sqlQueryFactory.createSimpleQueryStatement(genericQueryStatementsEnum, tableName, truthyPropertiesArray);

    let sanitizedValues = valueSanitizer.getSanitizedInputs(truthyPropertiesArray);
    let statementResult = await dbAction.executeStatementAsync(queryStatement, sanitizedValues);

    return statementResult;
}
//Test: DONE
const resolveSingleConnectionStatementAsync = async function(propertiesArray, genericQueryStatementsEnum, tableName, connectionPool){
    let truthyPropertiesArray = valueSanitizer.getTruthySequelizeAttributesValues(propertiesArray);
    let queryStatement = sqlQueryFactory.createSimpleQueryStatement(genericQueryStatementsEnum, tableName, truthyPropertiesArray);

    let sanitizedInputs = valueSanitizer.getSanitizedInputs(truthyPropertiesArray);
    let statementResult = await dbAction.executeSingleConnectionStatementAsync(connectionPool, queryStatement, sanitizedInputs);

    return statementResult;
}
//Test: DONE
const resolveUpdateWhereEqualsStatementAsync = async function(propertiesArray, whereConditionsPropertiesArray, tableName){
    try{
        let truthyPropertiesArray = valueSanitizer.getTruthySequelizeAttributesValues(propertiesArray);
        let whereConditionTruthyPropertiesArray = valueSanitizer.getTruthySequelizeAttributesValues(whereConditionsPropertiesArray);

        let queryStatement = sqlQueryFactory.updateTableSetColumnValuesWhere(tableName, truthyPropertiesArray, whereConditionTruthyPropertiesArray);
        truthyPropertiesArray.push.apply(truthyPropertiesArray, whereConditionTruthyPropertiesArray);
        let sanitizedValues = valueSanitizer.getSanitizedInputs(truthyPropertiesArray);
        let statementResult = await dbAction.executeStatementAsync(queryStatement, sanitizedValues);

        return statementResult;
    }catch(error){

        monitorService.capture('Error while executing function resolveConditionalWhereEqualsStatementAsync()- Error:');
        monitorService.capture(error);
        return new Error(error);
    }
}
//Test: DONE
const resolveSelectWherePropertyEqualsAndIsNullStatementAsync = async function(propertiesIncludingNullValueArray, tableName){

    let nullPositionsArray = getNullValuesIndexPositions(propertiesIncludingNullValueArray);
    let queryStatement = sqlQueryFactory.selectWherePropertyEqualsAndIsNull (tableName, propertiesIncludingNullValueArray, nullPositionsArray);
    let truthyPropertiesArray = valueSanitizer.getTruthySequelizeAttributesValues(propertiesIncludingNullValueArray);
    let sanitizedValues = valueSanitizer.getSanitizedInputs(truthyPropertiesArray);
    let statementResult = await dbAction.executeStatementAsync(queryStatement, sanitizedValues);

    return statementResult;
}

//Test: DONE
const resolveSingleConnectionInsertMultipleRowsSqlStatementAsync = async function(propertiesArrayOfRows, genericQueryStatementsEnum, tableName, connectionPool){
    const propertiesArrayFirstRow = propertiesArrayOfRows[0];
    const truthyPropertiesArray = valueSanitizer.getTruthySequelizeAttributesValues(propertiesArrayFirstRow);
    let queryStatement = sqlQueryFactory.createSimpleQueryStatement(genericQueryStatementsEnum, tableName, truthyPropertiesArray);

    let sanitizedInputsArrayOfRows = [];
    for(let a = 0; a < propertiesArrayOfRows.length; a++){
        let truthyProperties = valueSanitizer.getTruthySequelizeAttributesValues(propertiesArrayOfRows[a]);
        let sanitizedInputs = valueSanitizer.getSanitizedInputs(truthyProperties);

        sanitizedInputsArrayOfRows.push(sanitizedInputs);
    }
    
    let statementResult = await dbAction.executeSingleConnectionInsertMultipleRowsSqlStatementAsync(connectionPool, queryStatement, sanitizedInputsArrayOfRows);

    return statementResult;
}


const sqlStatementManager = Object.freeze({
    resolveStatementAsync : resolveStatementAsync,
    resolveSingleConnectionStatementAsync : resolveSingleConnectionStatementAsync,
    resolveUpdateWhereEqualsStatementAsync : resolveUpdateWhereEqualsStatementAsync,
    resolveSelectWherePropertyEqualsAndIsNullStatementAsync : resolveSelectWherePropertyEqualsAndIsNullStatementAsync,
    resolveSingleConnectionInsertMultipleRowsSqlStatementAsync : resolveSingleConnectionInsertMultipleRowsSqlStatementAsync
});

module.exports = sqlStatementManager;


//#REGION Private Functions
function getNullValuesIndexPositions(propertiesArray){
    let positionsArray = [];
    for(let a=0;a<propertiesArray.length; a++){
        if(propertiesArray[a].value === null){
            positionsArray.push(a);
        }
    }
    return positionsArray;
}
//#ENDREGION Private Functions