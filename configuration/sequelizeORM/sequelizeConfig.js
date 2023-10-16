const emptyConnection = {
    database:'questionnaireDb',
    username:'',
    password:'',
    options:{
        host:'',
        dialect:'mysql'
    }
}

const service = Object.freeze({
    emptyConnection: emptyConnection
});

module.exports = service;