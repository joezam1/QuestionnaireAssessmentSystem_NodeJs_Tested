const responseStatementManager = require('../../domainLayer/domainManagers/responseStatementManager.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');


const responseStatementController = function (app) {

    //METHOD

    //CREATE
    app.post('/api/responsestatement/save', async function (request, response) {

        console.log('request', request);
        let categoriesAssessmentResult = await responseStatementManager.resolveResponseStatementAsync(request);
        console.log('categoriesAssessmentResult:', categoriesAssessmentResult);
        httpResponseService.sendHttpResponse(response, categoriesAssessmentResult);
        return;
    });

    //READ
    //UPDATE
    //DELETE
}

module.exports = responseStatementController;