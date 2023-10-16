require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();


const envConfig = require('./configuration/environment/envConfig.js');
const serverConfig = require('./configuration/server/serverConfig.js');

const questionnaireController = require('./app/presentationLayer/controllers/questionnaireController.js');


console.log(`server-NODE_ENV=${envConfig.environmentConfiguration.NODE_ENV }`);
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
console.log(`process.env.TEST_VALUE=${process.env.TEST_VALUE}`);

console.log(`process.env=${process.env}`);




//#REGION Middleware

app.use(express.json());
app.use(express.urlencoded());
app.use(cors(serverConfig.configuration.corsOptions));
app.use(cookieParser());

//#ENDREGION Middleware


//#REGION Controllers
questionnaireController(app);

//#ENDREGION Controllers


//#REGION Server
const httpServer = http.createServer(app);
httpServer.listen(serverConfig.configuration.HTTP_PORT, function(){
    console.log(`HTTP Server is running on Port ${serverConfig.configuration.HTTP_PORT}`);
});
//#ENDREGION Server