const monitorService = require('../../servicesLayer/monitoring/monitorService.js');
const questionnaireDomainManager = require('../../domainLayer/domainManagers/questionnaireDomainManager.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');

const questionnaireController = function(app){
    //METHOD

    //CREATE
    //READ
    app.get('/api/questionnaires/test', async function(request, response){

        const clientRequest = "REQUEST: app.get('/api/questionnaire/test')";
        monitorService.capture(clientRequest);
        console.log(clientRequest);
        response.status(200).send("ok it works!!");
    });


    app.get('/api/questionnaires/guid/:UUID', async function(request, response){       
        
        const clientRequest = 'REQUEST: app.get(/api/questionnaire/{GUID}';
        monitorService.capture(clientRequest);
        console.log(clientRequest);
        const uuid = request.params.UUID;
        const result =await questionnaireDomainManager.createQuestionnaireByIdAsync(uuid);
        httpResponseService.sendHttpResponse(response, result);

        return;
    });


    app.get('/api/questionnaires/index/:INDEX', async function(request, response){       
        
        const clientRequest = 'REQUEST: app.get(/api/questionnaire/:INDEX';
        monitorService.capture(clientRequest);
        console.log(clientRequest);
        const result =await questionnaireDomainManager.createQuestionnaireByIndex_NoSexTypeAsync(request);
        httpResponseService.sendHttpResponse(response, result);

        return;
    });

    //UPDATE

    //DELETE
}

module.exports = questionnaireController;


//#REGION Private Functions 

//#ENDREGION Private Functions 