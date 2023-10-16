const monitorService = require('../../servicesLayer/monitoring/monitorService.js');
const questionnaireDomainManager = require('../../domainLayer/domainManagers/questionnaireDomainManager.js');


const questionnaireController = function(app){
    //METHOD

    //CREATE
    //READ
    app.get('/api/questionnaire/test', async function(request, response){

        let clientRequest = "REQUEST: app.get('/api/questionnaire/test')";
        monitorService.capture(clientRequest);

        response.status(200).send("ok it works!!");
    });


    app.get('/api/questionnaire/:UUID', async function(request, response){
        
        
        let clientRequest = 'REQUEST: app.get(/api/questionnaire/{GUID}';
        monitorService.capture(clientRequest);

        let uuid = request.params.UUID;
        var result =await questionnaireDomainManager.createQuestionnaireByIdAsync(uuid);
        response.status(200).send(result);
        return;
    });

    //UPDATE

    //DELETE
}

module.exports = questionnaireController;


//#REGION Private Functions 

//#ENDREGION Private Functions 