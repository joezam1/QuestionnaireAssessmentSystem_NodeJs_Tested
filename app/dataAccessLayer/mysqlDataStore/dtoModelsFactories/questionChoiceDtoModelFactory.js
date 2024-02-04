const dbContext = require('../context/dbContext.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;

onInit();

const createQuestionChoiceDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.QuestionChoicesDtoModel_MappedFromDatabase:
            result = createQuestionChoicesDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;
    }
    return result;

}

const questionChoiceDtoModelFactory = Object.freeze({
    createQuestionChoiceDtoModel : createQuestionChoiceDtoModel
});

module.exports = questionChoiceDtoModelFactory;

//#REGION: Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}


function createQuestionChoicesDtoModelMappedFromDatabase(databaseResultArray){    
    let allQuestionChoicessDtoModel = [];
    for(let a = 0; a < databaseResultArray.length; a++){
        let questionChoiceDb = databaseResultArray[a];
        let _questionChoiceDtoModel = new _context.QuestionChoiceDtoModel();
        let _choiceDtoModel = new _context.ChoiceDtoModel();
        let _categoryDtoModel = new _context.CategoryDtoModel();
        let _subcategoryDtoModel = new _context.SubcategoryDtoModel();

        _choiceDtoModel.rawAttributes.Name.value = questionChoiceDb.ChoiceName;
        _choiceDtoModel.rawAttributes.Value.value = questionChoiceDb.ChoiceValue;
        _choiceDtoModel.rawAttributes.CategorySubcategoryId.value = questionChoiceDb.CategorySubcategoryId;

        let clonedChoiceDtoModel = JSON.parse(JSON.stringify(_choiceDtoModel.rawAttributes));

        _categoryDtoModel.rawAttributes.CategoryId.value = questionChoiceDb.CategoryId;
        _categoryDtoModel.rawAttributes.Name.value = questionChoiceDb.CategoryName;
        _categoryDtoModel.rawAttributes.Description.value = questionChoiceDb.CategoryDescription;

        let clonedCategoryDtoModel = JSON.parse(JSON.stringify(_categoryDtoModel.rawAttributes));

        _subcategoryDtoModel.rawAttributes.SubcategoryId.value = questionChoiceDb.SubcategoryId;
        _subcategoryDtoModel.rawAttributes.Name.value = questionChoiceDb.SubcategoryName;
        _subcategoryDtoModel.rawAttributes.Description.value = questionChoiceDb.SubcategoryDescription;

        let clonedSubcategoryDtoModel = JSON.parse(JSON.stringify(_subcategoryDtoModel.rawAttributes));

        _questionChoiceDtoModel.rawAttributes.QuestionChoiceId.value = questionChoiceDb.QuestionChoiceId;
        _questionChoiceDtoModel.rawAttributes.QuestionId.value = questionChoiceDb.QuestionId;
        _questionChoiceDtoModel.rawAttributes.ChoiceId.value = questionChoiceDb.ChoiceId;

        let clonedAttributes = JSON.parse(JSON.stringify(_questionChoiceDtoModel.rawAttributes));
        clonedAttributes.ChoiceObj = clonedChoiceDtoModel;
        clonedAttributes.CategoryObj = clonedCategoryDtoModel;
        clonedAttributes.SubcategoryObj = clonedSubcategoryDtoModel;
        allQuestionChoicessDtoModel.push(clonedAttributes);
    }

    return allQuestionChoicessDtoModel;
}
//#ENDREGION: Private Functions