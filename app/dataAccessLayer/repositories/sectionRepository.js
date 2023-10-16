const dbAction = require( "../mysqlDataStore/context/dbAction.js");
const dbContext = require('../mysqlDataStore/context/dbContext.js');

let _context = null;

onInit();

const getAllSectionsByQuestionnaireIdAsync =async function(uuid){

    const query = `SELECT * from Sections where QuestionnaireId = '${uuid}'`;
    let statementResult = await dbAction.executeStatementAsync(query);
    
    if(statementResult instanceof Error){
        return statementResult;
    }

    let allSectionsDtoModel = getSectionDtoModelMappedFromDatabase(statementResult[0]);
    return allSectionsDtoModel;
}


const sectionRepository = Object.freeze({
    getAllSectionsByQuestionnaireIdAsync: getAllSectionsByQuestionnaireIdAsync
});

module.exports = sectionRepository;


//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
}


function getSectionDtoModelMappedFromDatabase(databaseResultArray){

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

//#RENDREGION Private Functions 