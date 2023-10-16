
const dbAction = require('../mysqlDataStore/context/dbAction.js');
const dbContext = require('../mysqlDataStore/context/dbContext.js');

let _context = null;

onInit();

const getQuestionnaireInfoByIdAsync = async function(uuid){

    let query = `SELECT * FROM questionnairedb.questionnaires where QuestionnaireId = '${uuid}'`;
    var statementResult = await  dbAction.executeStatementAsync(query);
    if(statementResult instanceof Error){
        return statementResult;
    }

    let questionnaireInfoDtoModel = getQuestionnaireDtoModelMappedFromDatabase(statementResult[0]);

    return questionnaireInfoDtoModel;
}


const questionnaireRepository = Object.freeze({
    getQuestionnaireInfoByIdAsync : getQuestionnaireInfoByIdAsync
});

module.exports = questionnaireRepository;


//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
}
function getQuestionnaireDtoModelMappedFromDatabase(databaseResultArray){

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

//#ENDREGION Private Functions 