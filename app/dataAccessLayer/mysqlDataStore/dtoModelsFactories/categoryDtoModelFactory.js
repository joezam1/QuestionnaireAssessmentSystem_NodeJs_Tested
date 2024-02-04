const dbContext = require('../context/dbContext.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;

onInit();

const createCategoryDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.CategoriesDtoModel_MappedFromDatabase:
            result = createCategoriesDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;
    }
    return result;

}

const categoryDtoModelFactory = Object.freeze({
    createCategoryDtoModel : createCategoryDtoModel
});

module.exports = categoryDtoModelFactory;

//#REGION: Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}


function createCategoriesDtoModelMappedFromDatabase(databaseResultArray){

    let allCategories = [];
    for(let a = 0; a< databaseResultArray.length; a++){
        let categoryDatabase = databaseResultArray[a];
        let _categoryDtoModel = new _context.CategoryDtoModel();

        _categoryDtoModel.rawAttributes.CategoryId.value = categoryDatabase.CategoryId;      
        _categoryDtoModel.rawAttributes.Name.value = categoryDatabase.Name;
        _categoryDtoModel.rawAttributes.Description.value = categoryDatabase.Description;
        _categoryDtoModel.rawAttributes.UTCDateCreated.value = categoryDatabase.UTCDateCreated;
        _categoryDtoModel.rawAttributes.UTCDateUpdated.value = categoryDatabase.UTCDateUpdated;
        _categoryDtoModel.rawAttributes.UTCDateArchived.value = categoryDatabase.UTCDateArchived;

        let clonedAttributes = JSON.parse(JSON.stringify(_categoryDtoModel.rawAttributes));
        allCategories.push(clonedAttributes);
    }

    return allCategories;
}

//#ENDREGION: Private Functions