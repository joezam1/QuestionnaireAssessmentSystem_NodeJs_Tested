require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();


const envConfig = require('./configuration/environment/envConfig.js');
const serverConfig = require('./configuration/server/serverConfig.js');
const sessionConfig = require('./configuration/authentication/sessionConfig.js');


const authenticationInspector = require('./app/middlewareLayer/authenticationInspector.js');
const questionnaireController = require('./app/presentationLayer/controllers/questionnaireController.js');
const userController = require('./app/presentationLayer/controllers/userController.js');
const responseStatementController = require('./app/presentationLayer/controllers/responseStatementController.js');

console.log(`server-NODE_ENV=${envConfig.environmentConfiguration.NODE_ENV }`);
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`);
console.log(`process.env.TEST_VALUE=${process.env.TEST_VALUE}`);
console.log('rocess.env=',process.env);




//#REGION Middleware
app.use(session(sessionConfig.activeSession));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({
    verify: (req, res, buf) => {
    req.rawBody = buf.toString()
    },
    limit: '50mb'
    }));
app.use(express.urlencoded());
app.use(cors(serverConfig.configuration.corsOptions));
app.use(cookieParser());
app.use(authenticationInspector);
//#ENDREGION Middleware


//#REGION Controllers
questionnaireController(app);
userController(app);
responseStatementController(app);
//#ENDREGION Controllers


//#REGION Server
const httpServer = http.createServer(app);
httpServer.listen(serverConfig.configuration.HTTP_PORT, function(){
    console.log(`HTTP Server is running on Port ${serverConfig.configuration.HTTP_PORT}`);
});
//#ENDREGION Server