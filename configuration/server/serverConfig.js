const envConfig = require('../../configuration/environment/envConfig.js');
const monitorService = require('../../app/servicesLayer/monitoring/monitorService.js');
const messageService = require('../../app/servicesLayer/mesages/messageService.js');

const whitelistRemoteOrigins = ['http://localhost:8080'];

const configuration = {
    HTTP_PORT: 5500,
    HTTPS_PORT: 5443,
    corsOptions:{
        origin: function(origin, callback){
            resolveOriginWhiteListing(origin, callback);
        }
    }
}

const serverConfig = Object.freeze({
    configuration: configuration,
    whitelistRemoteOrigin: whitelistRemoteOrigins
});

module.exports = serverConfig;

//#REGION Private Functions 
function resolveOriginWhiteListing(origin, callback){
    let environment = envConfig.environmentConfiguration.NODE_ENV;
    monitorService.capture('resolveOriginWhiteListing-origin: ', origin);
    monitorService.capture('resolveOriginWhiteListing-environment', environment);
    switch(environment){

        case envConfig.environmentTypes.DEVELOPMENT:
            if(origin === undefined){
                //NOTE: Usage for development with POSTMAN
                callback(null, true);
                break;
            }    
            whiteListOrigin(origin, callback);
        break;

        case envConfig.environmentTypes.PRODUCTION:
            whiteListOrigin(origin, callback);
        break;
    }
}


function whiteListOrigin(origin, callback){
    if(whitelistRemoteOrigins.indexOf(origin) === -1){
        let msg = messageService.corsErrorNotification;
        let corsError = new Error(msg);
        callback(corsError);
        return;
    }
    else{
        callback(null, true);
    }
}
//#ENDREGION Private Functions
