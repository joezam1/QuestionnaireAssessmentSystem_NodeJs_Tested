const genericQqlQueryStatement = require('../../../servicesLayer/enumerations/genericSqlQueryStatement.js');


//Test: DONE
const createSimpleQueryStatement = function( genericQueryStatementsEnum, tableName, sequelizePropertiesArray ){

    let selectedStatement = '';
    switch(genericQueryStatementsEnum){

        case genericQqlQueryStatement.selectWherePropertyEqualsAnd:
            selectedStatement = selectWherePropertyEqualsAnd(tableName, sequelizePropertiesArray);
            break;

        case genericQqlQueryStatement.selectAllFromTable:
            selectedStatement = selectAllFromTable(tableName);
            break;

        case genericQqlQueryStatement.insertIntoTableValues:
            selectedStatement = insertIntoTableValues(tableName, sequelizePropertiesArray);
            break;

        case genericQqlQueryStatement.insertMultipleRowsIntoTableValues:
            selectedStatement = insertMultipleRowsIntoTableValues(tableName, sequelizePropertiesArray);
            break;

        case genericQqlQueryStatement.deleteFromTableWhere:
            selectedStatement = deleteFromTableWhere(tableName, sequelizePropertiesArray);
            break;

    }

    return selectedStatement;
}


//Test: DONE
const selectWherePropertyEqualsAndIsNull = function(tableName, sequelizePropertiesArray, isNullOrderOfAppearenceInPropertiesArray){

    let allProperties = '';
    let totalArrayElements = sequelizePropertiesArray.length;
    for(let a = 0; a < totalArrayElements; a++){
        let valueFound = isNullOrderOfAppearenceInPropertiesArray.find((value)=>{
            return value === a;});
        if(valueFound){
            allProperties += sequelizePropertiesArray[a].field +' IS NULL '
        }
        else if(a <= (totalArrayElements - 1)){
            allProperties += sequelizePropertiesArray[a].field +' = ?'
        }
        if(a <= (totalArrayElements - 2)){
            allProperties += ' AND '
        }
    }
    let statement = `SELECT * FROM ${tableName} WHERE ${allProperties}`;

    return statement;
}

//Test: DONE
const updateTableSetColumnValuesWhere = function(tableName, sequelizePropertiesArray , sequelizeWhereConditionPropertiesArray){
    let allProperties = '';
    let totalArrayElements = sequelizePropertiesArray.length;
    for(let a = 0; a < totalArrayElements; a++){
        if(a <= (totalArrayElements - 2)){
            allProperties += sequelizePropertiesArray[a].field +' = ? , '
        }
        if(a == (totalArrayElements - 1)){
            allProperties += sequelizePropertiesArray[a].field +' = ?'
        }
    }

    let allConditionalProperties = '';
    if(sequelizeWhereConditionPropertiesArray !== null && Array.isArray(sequelizeWhereConditionPropertiesArray)){
        allConditionalProperties += ' WHERE ';
        let totalConditionalElement = sequelizeWhereConditionPropertiesArray.length;
        for(let b = 0; b< totalConditionalElement; b++){
            if(b <= (totalConditionalElement - 2)){
                allConditionalProperties += sequelizeWhereConditionPropertiesArray[b].field +' = ? AND '
            }
            if(b == (totalConditionalElement - 1)){
                allConditionalProperties += sequelizeWhereConditionPropertiesArray[b].field +' = ?'
            }
        }
    }
    let statement = `UPDATE ${tableName} SET ${allProperties} ${allConditionalProperties}`;

    return statement;
}

const sqlQueryFactory =Object.freeze({
    createSimpleQueryStatement : createSimpleQueryStatement,   
    updateTableSetColumnValuesWhere : updateTableSetColumnValuesWhere,
    selectWherePropertyEqualsAndIsNull : selectWherePropertyEqualsAndIsNull
});

module.exports = sqlQueryFactory;


//#REGION Private Functions


function selectWherePropertyEqualsAnd (tableName, sequelizePropertiesArray){

    let allProperties = '';
    let totalArrayElements = sequelizePropertiesArray.length;
    for(let a = 0; a < totalArrayElements; a++){
        if(a <= (totalArrayElements - 2)){
            allProperties += sequelizePropertiesArray[a].field +' = ? AND '
        }
        if(a == (totalArrayElements - 1)){
            allProperties += sequelizePropertiesArray[a].field +' = ?'
        }
    }
    let statement = `SELECT * FROM ${tableName} WHERE ${allProperties}`;

    return statement;
}




function selectAllFromTable(tableName){
    let statement = `SELECT * FROM ${tableName}`;

    return statement;
}


function insertIntoTableValues(tableName, sequelizePropertiesArray){

    let columnNames = '';
    let values = '';
    for(let a = 0; a< sequelizePropertiesArray.length ; a++){
        if(a == 0){
            columnNames += ''+sequelizePropertiesArray[a].field;
            values += '?';
        }else{
            columnNames += ','+sequelizePropertiesArray[a].field;
            values += ',?'
        }
    }
    var statement = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${values} );`;

    return statement;
}


function insertMultipleRowsIntoTableValues(tableName, sequelizePropertiesArray){

    let columnNames = '';
    let values = '';
    for(let a = 0; a< sequelizePropertiesArray.length ; a++){
        if(a == 0){
            columnNames += ''+sequelizePropertiesArray[a].field;
            values += '?';
        }else{
            columnNames += ','+sequelizePropertiesArray[a].field;
            values += ',?'
        }
    }
    var statement = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ?;`;

    return statement;
}

function deleteFromTableWhere(tableName, sequelizePropertiesArray){

    let allProperties = '';
    let totalArrayElements = sequelizePropertiesArray.length;
    for(let a = 0; a < totalArrayElements; a++){
        if(a <= (totalArrayElements - 2)){
            allProperties += sequelizePropertiesArray[a].field +' = ? AND '
        }
        if(a == (totalArrayElements - 1)){
            allProperties += sequelizePropertiesArray[a].field +' = ?'
        }
    }
    let statement = `DELETE FROM ${tableName} WHERE ${allProperties}`;

    return statement;
}
//#ENDREGION Private Functions
