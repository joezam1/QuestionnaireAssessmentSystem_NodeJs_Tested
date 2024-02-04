const domainModel = require('../../servicesLayer/enumerations/domainModel');
const responseModel = require('../domainModels/responseModel.js');

const createDomainModel = function(domainModelEnum , objModel ){
    let model = null;

    switch(domainModelEnum){

        case domainModel.ResponseModel_MappedFromResponseViewModel:
            model = createResponseModelMappedFromResponseViewModel(objModel);
        break;
    }
    
    return model;
}

const responseDomainModel = Object.freeze({
    createDomainModel : createDomainModel
});


module.exports = responseDomainModel;


//#REGION Private Functions
function createResponseModelMappedFromResponseViewModel(responseViewModel){

    
    let _responseModel = new responseModel();
    _responseModel.setResponseDetailsFromResponseViewModel(responseViewModel);

    return _responseModel;
}

//#ENDREGION Private Functions