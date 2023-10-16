const dotenv = require('dotenv');
const path = require('path');


console.log('envConfig.js FILE: process.env.NODE_ENV', process.env.NODE_ENV);
let envConfiguration={
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
}

dotenv.config(envConfiguration);

let environmentConfiguration = {
    NODE_ENV : process.env.NODE_ENV,
    HOST: process.env.HOST
}

let environmentTypes = {
    PRODUCTION: 'production',
    STAGING:'staging',
    DEVELOPMENT: 'development'
}

const envConfig = Object.freeze({
    environmentConfiguration: environmentConfiguration,
    environmentTypes:environmentTypes
});

module.exports = envConfig;