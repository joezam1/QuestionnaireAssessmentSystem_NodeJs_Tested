const monitorService = require('../../servicesLayer/monitoring/monitorService.js');
const userDomainManager = require('../../domainLayer/domainManagers/userDomainManager.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');


const userController = function(app){

    //METHOD

    //CREATE
    app.post('/api/users/register', async function(request, response){
        monitorService.capture('app.post(/api/users/register');
        var userRegistrationResult = await userDomainManager.resolveUserRegistrationAsync(request);
        httpResponseService.sendHttpResponse(response , userRegistrationResult);
        return;
    });


    app.post('/api/users/login', async function(request, response){
        monitorService.capture('app.post(/api/users/login');
        var userLoginResult = await userDomainManager.resolveUserLoginSessionAsync(request);
        monitorService.capture('userLoginResult', userLoginResult);
        httpResponseService.sendHttpResponse(response, userLoginResult);
        return;
    });

    
    app.post('/api/users/logout', async function(request, response){
        monitorService.capture('app.get(/api/users/logout');
        let userLogoutResult = await userDomainManager.resolveUserLogoutSessionAsync( request );
        monitorService.capture('userLogoutResult', userLogoutResult);
        httpResponseService.sendHttpResponse(response, userLogoutResult);
        return;
    });


    //READ
    app.get('/api/users/test', async function(request, response){

        const clientRequest = "REQUEST: app.get('/api/users/test')";
        monitorService.capture(clientRequest);
        console.log(clientRequest);
        response.status(200).send("USERS ok. It works!!");
    });

     app.get('api/users/{GUID}', async function(request, reqponse){

     });
 
     app.get('/api/users', async function(request, response){
 
     });
 
     //UPDATE
     app.put('/api/users/{GUID}', async function(request, response){
 
     });
 
     //DELETE
     app.delete('/api/users/{GUID}', async function(request, response){
 
     });
}

module.exports = userController;