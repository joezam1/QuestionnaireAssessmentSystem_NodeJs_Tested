const dbAction = require('../mysqlDataStore/context/dbAction.js');
const dbContext = require('../mysqlDataStore/context/dbContext.js');

let _context = null;

onInit();

const getAllQuestionsByAllSectionsIdAsync  = async function(sectionIdArray){

    let query = buildQueryStatement(sectionIdArray);
    let statementResult = await dbAction.executeStatementAsync(query);
    if(statementResult instanceof Error){
        return statementResult;
    }

    let allQuestionsDtoModel = getAllQuestionsDtoModelMappedFromDatabase(statementResult[0]);

    return allQuestionsDtoModel;
}

const questionRepository={
    getAllQuestionsByAllSectionsIdAsync : getAllQuestionsByAllSectionsIdAsync
}

module.exports = questionRepository;



//#REGION Private Functions 

function onInit(){
    _context = dbContext.getSequelizeContext();
}

function buildQueryStatement_generic(sectionIdArray){

    let queryStatement = 'select * from questionnairedb.questions';
    for(let i = 0; i < sectionIdArray.length; i++)
    {
        queryStatement = queryStatement + (i === 0 ? ' where ': ''); ;
        queryStatement = queryStatement + (i> 0 ? ' or ': '');
        queryStatement = queryStatement + `SectionId = '${sectionIdArray[i]}'`;
    }
    return queryStatement;

}

function buildQueryStatement(sectionIdArray){

    let queryStatement = "select "+
    "q.QuestionId,"+
    "q.QuestionNumber,"+
    "q.Text,"+
    "q.SectionId,"+
    "q.CategorySubcategoryId,"+
    "q.Value,"+
    "q.UTCDateCreated,"+
    "cat.CategoryId,"+
    "cat.Name as 'CategoryName',"+
    "cat.Description as 'CategoryDescription',"+
    "subcat.SubcategoryId,"+
    "subcat.Name as 'SubcategoryName',"+
    "subcat.Description as 'SubcategoryDescription' "+
    "from questionnairedb.questions as q "+
    "inner join questionnairedb.categorysubcategories as catSubcat "+
    "on q.CategorySubcategoryId = catSubcat.CategorySubcategoryId "+    
    "inner join questionnairedb.categories as cat "+
    "on catSubcat.CategoryId = cat.CategoryId "+    
    "inner join questionnairedb.subcategories as subcat "+
    "on catSubcat.SubcategoryId = subcat.SubcategoryId ";    
 
    for(let i = 0; i < sectionIdArray.length; i++)
    {
        queryStatement = queryStatement + (i === 0 ? " where ": ""); ;
        queryStatement = queryStatement + (i> 0 ? " or ": "");
        queryStatement = queryStatement + `q.SectionId = '${sectionIdArray[i]}'`;
    }
    queryStatement = queryStatement + ";";

    return queryStatement;

}

function getAllQuestionsDtoModelMappedFromDatabase(databaseResultArray){

    let allQuestionsDtoModel = [];
    for(let a = 0; a < databaseResultArray.length; a++){
        let questionDb = databaseResultArray[a];
        let _questionDtoModel = new _context.QuestionDtoModel();
        let _categoryDtoModel = new _context.CategoryDtoModel();
        let _subcategoryDtoModel = new _context.SubcategoryDtoModel();

        _categoryDtoModel.rawAttributes.CategoryId.value = questionDb.CategoryId;
        _categoryDtoModel.rawAttributes.Name.value = questionDb.CategoryName;
        _categoryDtoModel.rawAttributes.Description.value = questionDb.CategoryDescription;

        let clonedCategoryDtoModel = JSON.parse(JSON.stringify(_categoryDtoModel.rawAttributes));

        _subcategoryDtoModel.rawAttributes.SubcategoryId.value = questionDb.CategorySubcategoryId;
        _subcategoryDtoModel.rawAttributes.Name.value = questionDb.SubcategoryName;
        _subcategoryDtoModel.rawAttributes.Description.value = questionDb.SubcategoryDescription;

        let clonedSubcategoryDtoModel = JSON.parse(JSON.stringify(_subcategoryDtoModel.rawAttributes));

        _questionDtoModel.rawAttributes.QuestionId.value = questionDb.QuestionId;
        _questionDtoModel.rawAttributes.QuestionNumber.value = questionDb.QuestionNumber;
        _questionDtoModel.rawAttributes.Text.value = questionDb.Text;
        _questionDtoModel.rawAttributes.SectionId.value = questionDb.SectionId;
        _questionDtoModel.rawAttributes.CategorySubcategoryId.value = questionDb.CategorySubcategoryId;
        _questionDtoModel.rawAttributes.Value.value = questionDb.Value;
        _questionDtoModel.rawAttributes.UTCDateCreated.value = questionDb.UTCDateCreated;
        _questionDtoModel.rawAttributes.UTCDateUpdated.value = questionDb.UTCDateUpdated;
        _questionDtoModel.rawAttributes.UTCDateArchived.value = questionDb.UTCDateArchived;

        let clonedAttributes = JSON.parse(JSON.stringify(_questionDtoModel.rawAttributes));
        clonedAttributes.CategoryObj = clonedCategoryDtoModel;
        clonedAttributes.SubcategoryObj = clonedSubcategoryDtoModel;
        allQuestionsDtoModel.push(clonedAttributes);

    }
    return allQuestionsDtoModel;

}

//#ENDREGION Private Functions 