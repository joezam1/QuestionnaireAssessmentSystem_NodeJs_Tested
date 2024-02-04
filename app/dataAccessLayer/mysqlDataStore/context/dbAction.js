const inputCommonInspector = require('../../../servicesLayer/validation/inputCommonInspector.js');
const dbConnection = require('./dbConnection.js');
const monitorService = require('../../../servicesLayer/monitoring/monitorService.js');


const executeStatementAsync = async function(statement, valuesArray = null){
    try{
        var pool = dbConnection.getPool();
        var poolPromise = pool.promise();
        if(inputCommonInspector.objectIsNullOrEmpty(valuesArray)){
            const[rows, fields] = await poolPromise.execute(statement);
            return [rows, fields];
        }
        if(Array.isArray(valuesArray)){
            const [ rows, fields ] = await poolPromise.execute(statement, valuesArray);
            return [rows, fields]; 
        }

        const emptyResult = [[],[]];
        return emptyResult;

    }
    catch(err){
        monitorService.capture('err', err);
        return new Error(err);
    }
}


const getSingleConnectionFromPoolPromiseAsync = async function(){
    const poolOfDbThreads = dbConnection.getPool();
    const promiseConnection = new Promise(function(resolve, reject){
        poolOfDbThreads.getConnection(function(connectionError, singleConnection){

            if(connectionError){
                (reject("Error Occurred while getting the single connection from the pool. Error: "+connectionError))
            }
            resolve(singleConnection)
        });

    });

    const result = await promiseConnection;
    return result;
}

const beginTransactionSingleConnectionAsync = async function(connectionPool){

    await connectionPool.promise().execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    connectionPool.beginTransaction();
}

const executeSingleConnectionStatementAsync = async function(connectionPool, statement, valuesArray = null){
    try{
        if(inputCommonInspector.objectIsNullOrEmpty(valuesArray)){
            const [rows, fields] = await connectionPool.promise().execute(statement);
            return [rows, fields];
        }

        if(Array.isArray(valuesArray)){
            const [rows, fields] = await connectionPool.promise().execute(statement, valuesArray);
            return [rows, fields];
        }
        const emptyResult = [[],[]];
        return emptyResult;
    }
    catch(err){
        monitorService.capture('err', err);
        return new Error(err);
    }
}


const executeSingleConnectionInsertMultipleRowsSqlStatementAsync = async function(connectionPool, sqlStatement, valuesArrayOfRows = null){
    try{
        
        console.log('sqlStatement: ', sqlStatement);
        console.log('valuesArrayOfRows', valuesArrayOfRows);
        const multipleInsertResult = new Promise(async function(resolve, reject){
            if(Array.isArray(valuesArrayOfRows)){
                const queryCallback =function(sqlError, sqlResult){
                    if (sqlError) {
                        console.log('ERROR_sqlError:', sqlError);
                        reject(sqlError);
                    }
                    else{
                        resolve(sqlResult);
                    }
                }
                const singleBulkRows = [valuesArrayOfRows];
                connectionPool.query(sqlStatement,singleBulkRows , queryCallback); 
            }
            else{
                const emptyResult = [[],[]];
                resolve(emptyResult);
            }            
        });

        return await multipleInsertResult;
       
    }
    catch(err){
        console.log('ERROR_err:', err);
        monitorService.capture('err', err);
        return new Error(err);
    }
}




const rollbackTransactionSingleConnection = function(connectionPool){

    connectionPool.rollback();
    connectionPool.release();
}


const commitTransactionSingleConnection = function(connectionPool){

    connectionPool.commit(function(error){
        if(error){
            rollbackTransactionSingleConnection(connectionPool);
            return;
        }
    });

    connectionPool.release();
}

const dbAction = Object.freeze({
    executeStatementAsync: executeStatementAsync,
    getSingleConnectionFromPoolPromiseAsync : getSingleConnectionFromPoolPromiseAsync,
    beginTransactionSingleConnectionAsync : beginTransactionSingleConnectionAsync,
    executeSingleConnectionStatementAsync : executeSingleConnectionStatementAsync,
    executeSingleConnectionInsertMultipleRowsSqlStatementAsync : executeSingleConnectionInsertMultipleRowsSqlStatementAsync,
    rollbackTransactionSingleConnection : rollbackTransactionSingleConnection,
    commitTransactionSingleConnection : commitTransactionSingleConnection
});

module.exports = dbAction;

//#REGION Private Functions


//#ENDREGION Private Functions