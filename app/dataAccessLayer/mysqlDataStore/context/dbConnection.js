const mysql = require('mysql2');
const mysqlConfig = require('../../../../configuration/database/mysqlConfig.js');

let pool = null;

const getPool = function(){
    if(pool=== null){
        pool = createMysqlPool();
    }
    return pool;
}

let service =Object.freeze({
    getPool: getPool
});

module.exports = service;

//#REGION Private Functions 
function createMysqlPool(){
    let poolConnection = mysqlConfig;
    let poolCreated = mysql.createPool(poolConnection);
    return poolCreated;
}

//#ENDREGION Private Functions