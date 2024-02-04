
const dbAction = require('../mysqlDataStore/context/dbAction.js');
const dbContext = require('../mysqlDataStore/context/dbContext.js');
const questionnaireDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/questionnaireDtoModelFactory.js');
const dtoModel = require('../../servicesLayer/enumerations/dtoModel.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');

let _context = null;

onInit();

const getQuestionnaireInfoByIdAsync = async function(uuid){

    let query = `SELECT * FROM questionnairedb.questionnaires where QuestionnaireId = '${uuid}'`;
    let result = await executeQueryStatementGetResultAsync(query);
    return result;
}

const getQuestionnaireInfoByIndexAsync = async function(index){

    let query = `SELECT * FROM questionnairedb.questionnaires where QuestionnaireIndex = ${index}`;
    let result = await executeQueryStatementGetResultAsync(query);
    return result;
}


const questionnaireRepository = Object.freeze({
    getQuestionnaireInfoByIdAsync : getQuestionnaireInfoByIdAsync,
    getQuestionnaireInfoByIndexAsync : getQuestionnaireInfoByIndexAsync
});

module.exports = questionnaireRepository;


//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
}

async function executeQueryStatementGetResultAsync(query){
    var statementResult = await  dbAction.executeStatementAsync(query);
    if(statementResult instanceof Error){
        return statementResult;
    }

    let paramOptions = parameterOptions();
    paramOptions.parameterArray = statementResult[0];
    let questionnaireInfoDtoModel = questionnaireDtoModelFactory.createQuestionnaireDtoModel(dtoModel.QuestionnaireDtoModel_MappedFromDatabase, paramOptions );
    //getQuestionnaireDtoModelMappedFromDatabase(statementResult[0]);

    return questionnaireInfoDtoModel;
}

// function getQuestionnaireDtoModelMappedFromDatabase(databaseResultArray){

//     let allQuestionnairesDtoModel = [];
//     for(let a = 0; a < databaseResultArray.length; a++){
//         let questionnaireDb = databaseResultArray[a];
//         let _questionnaireDtoModel = new _context.QuestionnaireDtoModel();

//         _questionnaireDtoModel.rawAttributes.QuestionnaireId.value = questionnaireDb.QuestionnaireId;
//         _questionnaireDtoModel.rawAttributes.QuestionnaireIndex.value = questionnaireDb.QuestionnaireIndex;
//         _questionnaireDtoModel.rawAttributes.Name.value = questionnaireDb.Name;
//         _questionnaireDtoModel.rawAttributes.Description.value = questionnaireDb.Description;
//         _questionnaireDtoModel.rawAttributes.UTCDateCreated.value = questionnaireDb.UTCDateCreated;
//         _questionnaireDtoModel.rawAttributes.UTCDateUpdated.value = questionnaireDb.UTCDateUpdated;
//         _questionnaireDtoModel.rawAttributes.UTCDateArchived.value = questionnaireDb.UTCDateArchived;

//         let clonedAttributes = JSON.parse(JSON.stringify(_questionnaireDtoModel.rawAttributes));
//         allQuestionnairesDtoModel.push(clonedAttributes);

//     }

//     return allQuestionnairesDtoModel;
// }

//#ENDREGION Private Functions 