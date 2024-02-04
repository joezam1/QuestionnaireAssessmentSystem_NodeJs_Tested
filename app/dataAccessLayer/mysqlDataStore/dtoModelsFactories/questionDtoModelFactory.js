const dbContext = require('../context/dbContext.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;

onInit();

const createQuestionDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.QuestionsDtoModel_MappedFromDatabase:
            result = createQuestionsDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;
    }
    return result;

}

const questionDtoModelFactory = Object.freeze({
    createQuestionDtoModel : createQuestionDtoModel
});

module.exports = questionDtoModelFactory;

//#REGION: Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}

function createQuestionsDtoModelMappedFromDatabase(databaseResultArray){


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

//#ENDREGION: Private Functions
