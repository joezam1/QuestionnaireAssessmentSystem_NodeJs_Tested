
const dbContext = require('../context/dbContext.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;

onInit();

const createRoleDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.RoleDtoModel_MappedFromDatabase:
            result = createRolesDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;
    }
    return result;

}

//#REGION: Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}




const roleDtoModelFactory = {
    createRoleDtoModel : createRoleDtoModel
}

module.exports = roleDtoModelFactory;



//Test: DONE
const createRolesDtoModelMappedFromDatabase = function(databaseResultArray){
    let allRoles = [];
    for(let a = 0; a< databaseResultArray.length; a++){
        let roleDatabase = databaseResultArray[a];
        let _roleDtoModel = new _context.RoleDtoModel();
        _roleDtoModel.rawAttributes.RoleId.value = roleDatabase.RoleId;
        _roleDtoModel.rawAttributes.RoleIndex.value = roleDatabase.RoleIndex;
        _roleDtoModel.rawAttributes.Name.value = roleDatabase.Name;
        _roleDtoModel.rawAttributes.Description.value = roleDatabase.Description;
        _roleDtoModel.rawAttributes.IsActive.value = (roleDatabase.IsActive !== 0);
        _roleDtoModel.rawAttributes.UTCDateCreated.value = roleDatabase.UTCDateCreated;
        _roleDtoModel.rawAttributes.UTCDateUpdated.value = roleDatabase.UTCDateUpdated;

        let clonedAttributes = JSON.parse(JSON.stringify(_roleDtoModel.rawAttributes));
        allRoles.push(clonedAttributes);
    }

    return allRoles;
}

//#ENDREGION: Private Functions