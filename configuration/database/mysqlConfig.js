const mysqlConfig =Object.freeze( {
    host:'localhost',
    user:'root',
    password:'abc123',
    database:'questionnairedb',
    port:3306,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

module.exports = mysqlConfig;