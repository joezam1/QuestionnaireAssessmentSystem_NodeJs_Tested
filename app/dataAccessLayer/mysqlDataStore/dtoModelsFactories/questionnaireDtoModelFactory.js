const dbContext = require('../context/dbContext.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;

onInit();

const createQuestionnaireDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.QuestionnaireDtoModel_MappedFromDatabase:
            result = createQuestionnaireDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;
    }
    return result;

}

const questionnaireDtoModelFactory = Object.freeze({
    createQuestionnaireDtoModel : createQuestionnaireDtoModel
});

module.exports = questionnaireDtoModelFactory;

//#REGION: Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}


function createQuestionnaireDtoModelMappedFromDatabase(databaseResultArray){

    let allQuestionnairesDtoModel = [];
    for(let a = 0; a < databaseResultArray.length; a++){
        let questionnaireDb = databaseResultArray[a];
        let _questionnaireDtoModel = new _context.QuestionnaireDtoModel();

        _questionnaireDtoModel.rawAttributes.QuestionnaireId.value = questionnaireDb.QuestionnaireId;
        _questionnaireDtoModel.rawAttributes.QuestionnaireIndex.value = questionnaireDb.QuestionnaireIndex;
        _questionnaireDtoModel.rawAttributes.Name.value = questionnaireDb.Name;
        _questionnaireDtoModel.rawAttributes.Description.value = questionnaireDb.Description;
        _questionnaireDtoModel.rawAttributes.UTCDateCreated.value = questionnaireDb.UTCDateCreated;
        _questionnaireDtoModel.rawAttributes.UTCDateUpdated.value = questionnaireDb.UTCDateUpdated;
        _questionnaireDtoModel.rawAttributes.UTCDateArchived.value = questionnaireDb.UTCDateArchived;

        let clonedAttributes = JSON.parse(JSON.stringify(_questionnaireDtoModel.rawAttributes));
        allQuestionnairesDtoModel.push(clonedAttributes);

    }

    return allQuestionnairesDtoModel;
}

//#ENDREGION: Private Functions
