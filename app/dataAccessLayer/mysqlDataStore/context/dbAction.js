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

const dbAction = Object.freeze({
    executeStatementAsync: executeStatementAsync
});

module.exports = dbAction;

