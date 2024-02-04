const dbContext = require('../context/dbContext.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');
const helpers = require('../../../servicesLayer/common/helpers.js');

let _context = null;

onInit();
//Test: DONE

const createSectionDtoModel = function(dtoModelEnum, paramOptions){

    console.log('paramOptions: ', paramOptions);
    let result = null;
    switch(dtoModelEnum){
        case dtoModel.SectionDtoModel_MappedFromDomain:
            result = createSectionDtoModelMappedFromDomain(paramOptions.parameterObject);
            break;

        case dtoModel.SectionDtoModel_MappedFromDatabase:
            result = createSectionsDtoModelMappedFromDatabase(paramOptions.parameterArray);
            break;
    }

    return result;
}

const sectionDtoModelFactory = Object.freeze({
    createSectionDtoModel : createSectionDtoModel
});

module.exports = sectionDtoModelFactory;
//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
}

function createSectionDtoModelMappedFromDomain(sectionDomainModel){

    const dateNow = new Date();
    const utcDateCreated = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);

    let _sectionDtoModel = new _context.SectionDtoModel();
    _sectionDtoModel.rawAttributes.SectionId.value = sectionDomainModel.getSectionId();
    _sectionDtoModel.rawAttributes.SectionId.type.key = _sectionDtoModel.rawAttributes.SectionId.type.key.toString();
    _sectionDtoModel.rawAttributes.SectionIndex.value = sectionDomainModel.getSectionIndex();
    _sectionDtoModel.rawAttributes.SectionIndex.type.key = _sectionDtoModel.rawAttributes.SectionIndex.type.key.toString();
    _sectionDtoModel.rawAttributes.Name.value = sectionDomainModel.getName();
    _sectionDtoModel.rawAttributes.Name.type.key = _sectionDtoModel.rawAttributes.Name.type.key;
    _sectionDtoModel.rawAttributes.Description.value = sectionDomainModel.getDescription();
    _sectionDtoModel.rawAttributes.Description.type.key = _sectionDtoModel.rawAttributes.Description.type.key;
    _sectionDtoModel.rawAttributes.QuestionnaireId.value = sectionDomainModel.getQuestionnaireId();
    _sectionDtoModel.rawAttributes.QuestionnaireId.type.key = _sectionDtoModel.rawAttributes.QuestionnaireId.type.key;
    _sectionDtoModel.rawAttributes.UTCDateCreated.value = utcDateCreated;
    _sectionDtoModel.rawAttributes.UTCDateCreated.type.key =  _sectionDtoModel.rawAttributes.UTCDateCreated.type.key.toString();

    const clonedAttributes = JSON.parse(JSON.stringify(_sectionDtoModel.rawAttributes));
    return clonedAttributes;
}

function createSectionsDtoModelMappedFromDatabase(databaseResultArray){

    let allSectionsDtoModel = [];
    for(let a = 0; a < databaseResultArray.length; a++){
        let sectionDb = databaseResultArray[a];
        let _sectionDtoModel = new _context.SectionDtoModel();

        _sectionDtoModel.rawAttributes.SectionId.value = sectionDb.SectionId;
        _sectionDtoModel.rawAttributes.SectionIndex.value = sectionDb.SectionIndex;
        _sectionDtoModel.rawAttributes.Name.value = sectionDb.Name;
        _sectionDtoModel.rawAttributes.Description.value = sectionDb.Description;
        _sectionDtoModel.rawAttributes.QuestionnaireId.value = sectionDb.QuestionnaireId;
        _sectionDtoModel.rawAttributes.UTCDateCreated.value =  sectionDb.UTCDateCreated;
        _sectionDtoModel.rawAttributes.UTCDateUpdated.value = sectionDb.UTCDateUpdated;

        let clonedAttributes = JSON.parse(JSON.stringify(_sectionDtoModel.rawAttributes));
        allSectionsDtoModel.push(clonedAttributes);
    }
    return allSectionsDtoModel;
}


//#ENDREGION Private Functions 