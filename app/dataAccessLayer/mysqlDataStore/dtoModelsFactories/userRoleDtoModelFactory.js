const dbContext = require('../context/dbContext.js');
const monitorService = require('../../../servicesLayer/monitoring/monitorService.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;


onInit();


const createUserRoleDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.UserRoleDtoModel_MappedFromDomain:
            result = createUserRoleDtoModelMappedFromDomain(paramOptions.parameterObject);
        break;

        case dtoModel.UserRoleDtoModel_MappedFromDatabase:
            result = createUserRolesDtoModelMappedFromDatabase(paramOptions.parameterArray);
        break;

    }
    return result;
}






const userDtoModelFactory = Object.freeze({
    
    createUserRoleDtoModel:createUserRoleDtoModel
});
module.exports = userDtoModelFactory;

//#REGION Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}

const createUserRoleDtoModelMappedFromDomain = function(userRoleDomainModel) {
    monitorService.capture('userRoleDomainModel', userRoleDomainModel);

    let _userRoleDtoModel = new _context.UserRoleDtoModel();
    _userRoleDtoModel.rawAttributes.UserRoleId.value = userRoleDomainModel.getUserRoleId();
    _userRoleDtoModel.rawAttributes.UserRoleId.type.key =  _userRoleDtoModel.rawAttributes.UserRoleId.type.key.toString();
    _userRoleDtoModel.rawAttributes.UserId.value = userRoleDomainModel.getUserId();
    _userRoleDtoModel.rawAttributes.UserId.type.key =  _userRoleDtoModel.rawAttributes.UserId.type.key.toString();
    _userRoleDtoModel.rawAttributes.RoleId.value = userRoleDomainModel.getRoleId();
    _userRoleDtoModel.rawAttributes.RoleId.type.key =  _userRoleDtoModel.rawAttributes.RoleId.type.key.toString();
   
    let clonedAttributes = JSON.parse(JSON.stringify(_userRoleDtoModel.rawAttributes));
    return clonedAttributes;
}

const createUserRolesDtoModelMappedFromDatabase = function(databaseResultArray) {
    let allUserRolesDtoModels = [];
    for (let a = 0; a < databaseResultArray.length; a++) {
        let userRoleDatabase = databaseResultArray[a];
        monitorService.capture('userRoleDatabase', userRoleDatabase);
        let _userRoleDtoModel =new _context.UserRoleDtoModel();
        monitorService.capture('_userRoleDtoModel', _userRoleDtoModel);
        _userRoleDtoModel.rawAttributes.UserRoleId.value = userRoleDatabase.UserRoleId;
        _userRoleDtoModel.rawAttributes.UserId.value = userRoleDatabase.UserId;
        _userRoleDtoModel.rawAttributes.RoleId.value = userRoleDatabase.RoleId;

        _userRoleDtoModel.rawAttributes.UTCDateCreated.value = userRoleDatabase.UTCDateCreated;
        _userRoleDtoModel.rawAttributes.UTCDateUpdated.value = userRoleDatabase.UTCDateUpdated;

        let clonedAttributes = JSON.parse(JSON.stringify(_userRoleDtoModel.rawAttributes));
        allUserRolesDtoModels.push(clonedAttributes);
    }

    return allUserRolesDtoModels;
}


//#ENDREGION Private Functions
