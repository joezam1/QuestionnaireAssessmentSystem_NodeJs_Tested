const domainModel = require('../../servicesLayer/enumerations/domainModel.js');
const responseStatementModel = require('../domainModels/responseStatementModel.js');


const createDomainModel = function(domainModelEnum , objModel ){
    let model = null;

    switch(domainModelEnum){

        case domainModel.ResponseStatementModel_MappedFromResponseStatementId:
            model = createResponseStatementDomainModelMappedFromResponseStatementId(objModel.responseStatementId)
        break;
                      
        case domainModel.ResponseStatementModel_MappedFromResponseStatementViewModel:
            model = createResponseStatementModelMappedFromResponseStatementViewModel(objModel);
        break;
    }
    
    return model;
}

const responseStatementDomainModel = Object.freeze({
    createDomainModel : createDomainModel
});


module.exports = responseStatementDomainModel;


//$REGION Private Functions

const createResponseStatementDomainModelMappedFromResponseStatementId = function(responseStatementId){
    let _responseStatementModel = new responseStatementModel();
    _responseStatementModel.setResponseStatementId(responseStatementId);
    return _responseStatementModel;
}

const createResponseStatementModelMappedFromResponseStatementViewModel = function(responseStatementViewModel){

    let _responseStatementModel = new responseStatementModel();
    _responseStatementModel.setResponseStatementDetailsFromResponseStatementViewModel(responseStatementViewModel);

    return _responseStatementModel;
}

//#ENDREGION Private Functions