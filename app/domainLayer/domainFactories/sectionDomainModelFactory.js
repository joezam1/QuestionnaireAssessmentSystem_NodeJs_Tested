const sectionDomainModel = require('../domainModels/sectionModel.js');


const domainModelEnumeration = require('../../servicesLayer/enumerations/domainModel.js');

const createDomainModel = function(domainModelEnum , objModel ){
    let model = null;

    switch(domainModelEnum){

        case domainModelEnumeration.SectionModel_MappedFromQuestionnaireId:
            model = createSectionModelMappedFromQuestionnaireId(objModel.QuestionnaireId);
        break;

    }
    return model;
}


const sectionDomainModelFactory = Object.freeze({
    createDomainModel : createDomainModel
});

module.exports = sectionDomainModelFactory;


//#REGION Private Functions 
const createSectionModelMappedFromQuestionnaireId = function(QuestionnaireId){
    let _sectionDomainModel = new sectionDomainModel();
    _sectionDomainModel.setQuestionnaireId(QuestionnaireId);

    return _sectionDomainModel;
}


//#ENDREGION Private Functions