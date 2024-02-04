const dbAction = require('../mysqlDataStore/context/dbAction.js');
const dbContext = require('../mysqlDataStore/context/dbContext.js');
const questionChoiceDtoModelFactory = require('../mysqlDataStore/dtoModelsFactories/questionChoiceDtoModelFactory.js');
const dtoModel = require('../../servicesLayer/enumerations/dtoModel.js');
const parameterOptions = require('../mysqlDataStore/dtoModelsFactories/parameterOptions.js');

let _context = null;


onInit();

const getAllQuestionChoicesByAllQuestionsIdAsync = async function(questionIdArray){

    let query = buildQueryStatement(questionIdArray);
    let statementResult = await dbAction.executeStatementAsync(query);
    if(statementResult instanceof Error){
        return statementResult;
    }

    let paramOptions = new parameterOptions();
    paramOptions.parameterArray = statementResult[0];
    let allQuestionChoicesDtoModel = questionChoiceDtoModelFactory.createQuestionChoiceDtoModel(dtoModel.QuestionChoicesDtoModel_MappedFromDatabase,paramOptions);
    // getAllQuestionChoicesDtoModelMappedFromDatabase(statementResult[0]);
    return allQuestionChoicesDtoModel;
}

const questionChoiceRepository = {
    getAllQuestionChoicesByAllQuestionsIdAsync : getAllQuestionChoicesByAllQuestionsIdAsync
}

module.exports = questionChoiceRepository;

//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
}


function buildQueryStatement(questionIdArray){

    let queryStatement = "select "+
    "qc.QuestionChoiceId,"+
    "qc.QuestionId,"+
    "qc.ChoiceId,"+
    "ch.Name as 'ChoiceName',"+
    "ch.Value as 'ChoiceValue',"+
    "ch.CategorySubcategoryId,"+
    "cat.CategoryId,"+
    "cat.Name as 'CategoryName',"+
    "cat.Description as 'CategoryDescription',"+
    "subcat.SubcategoryId,"+
    "subcat.Name as 'SubcategoryName',"+
    "subcat.Description as 'SubcategoryDescription' "+    
    "from questionnairedb.questionchoices as qc "+
    "inner join questionnairedb.choices as ch "+
    "on qc.ChoiceId = ch.ChoiceId "+
    "inner join questionnairedb.categorysubcategories as catSubcat "+
    "on ch.CategorySubcategoryId = catSubcat.CategorySubcategoryId "+    
    "inner join questionnairedb.categories as cat "+
    "on cat.CategoryId = catSubcat.CategoryId "+    
    "inner join questionnairedb.subcategories as subcat "+
    "on subcat.SubcategoryId = catSubcat.SubcategoryId ";

    for(let i = 0; i < questionIdArray.length; i++)
    {
        queryStatement = queryStatement + (i === 0 ? " where ": ""); ;
        queryStatement = queryStatement + (i> 0 ? " or ": "");
        queryStatement = queryStatement + `qc.QuestionId = '${questionIdArray[i]}'`;
    }
    queryStatement = queryStatement + ";";

    return queryStatement;

}


// function getAllQuestionChoicesDtoModelMappedFromDatabase(databaseResultArray){

    
//     let allQuestionChoicessDtoModel = [];
//     for(let a = 0; a < databaseResultArray.length; a++){
//         let questionChoiceDb = databaseResultArray[a];
//         let _questionChoiceDtoModel = new _context.QuestionChoiceDtoModel();
//         let _choiceDtoModel = new _context.ChoiceDtoModel();
//         let _categoryDtoModel = new _context.CategoryDtoModel();
//         let _subcategoryDtoModel = new _context.SubcategoryDtoModel();

//         _choiceDtoModel.rawAttributes.Name.value = questionChoiceDb.ChoiceName;
//         _choiceDtoModel.rawAttributes.Value.value = questionChoiceDb.ChoiceValue;
//         _choiceDtoModel.rawAttributes.CategorySubcategoryId.value = questionChoiceDb.CategorySubcategoryId;

//         let clonedChoiceDtoModel = JSON.parse(JSON.stringify(_choiceDtoModel.rawAttributes));

//         _categoryDtoModel.rawAttributes.CategoryId.value = questionChoiceDb.CategoryId;
//         _categoryDtoModel.rawAttributes.Name.value = questionChoiceDb.CategoryName;
//         _categoryDtoModel.rawAttributes.Description.value = questionChoiceDb.CategoryDescription;

//         let clonedCategoryDtoModel = JSON.parse(JSON.stringify(_categoryDtoModel.rawAttributes));

//         _subcategoryDtoModel.rawAttributes.SubcategoryId.value = questionChoiceDb.SubcategoryId;
//         _subcategoryDtoModel.rawAttributes.Name.value = questionChoiceDb.SubcategoryName;
//         _subcategoryDtoModel.rawAttributes.Description.value = questionChoiceDb.SubcategoryDescription;

//         let clonedSubcategoryDtoModel = JSON.parse(JSON.stringify(_subcategoryDtoModel.rawAttributes));

//         _questionChoiceDtoModel.rawAttributes.QuestionChoiceId.value = questionChoiceDb.QuestionChoiceId;
//         _questionChoiceDtoModel.rawAttributes.QuestionId.value = questionChoiceDb.QuestionId;
//         _questionChoiceDtoModel.rawAttributes.ChoiceId.value = questionChoiceDb.ChoiceId;

//         let clonedAttributes = JSON.parse(JSON.stringify(_questionChoiceDtoModel.rawAttributes));
//         clonedAttributes.ChoiceObj = clonedChoiceDtoModel;
//         clonedAttributes.CategoryObj = clonedCategoryDtoModel;
//         clonedAttributes.SubcategoryObj = clonedSubcategoryDtoModel;
//         allQuestionChoicessDtoModel.push(clonedAttributes);


//     }
//     return allQuestionChoicessDtoModel;
// }
//#ENDREGION Private Functions



