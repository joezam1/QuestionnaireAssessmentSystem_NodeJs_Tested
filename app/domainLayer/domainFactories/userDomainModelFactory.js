const uuidV4 = require('uuid');
const uuid = uuidV4.v4;

const userDomainModel = require('../domainModels/userModel');
const roleDomainModel = require('../domainModels/roleModel.js');
const userRoleDomainModel = require('../domainModels/userRoleModel.js');
const registerDomainModel = require('../domainModels/registerModel.js');
const domainModelEnumeration = require('../../servicesLayer/enumerations/domainModel.js');

const createDomainModel = function(domainModelEnum , objModel ){
    let model = null;

    switch(domainModelEnum){

        case domainModelEnumeration.UserModel_MappedFromUserId:
            model = createUserDomainModel_mappedFromUserId(objModel.userId);
        break;

        case domainModelEnumeration.UserModel_MappedFromUserViewModel:
            model = createUserDomainModelMappedFromUserViewModel(objModel);
        break;

        case domainModelEnumeration.RoleModel_MappedFromRoleDtoModel:
            model = createRoleModelMappedFromRoleDtoModel(objModel);
        break;

        case domainModelEnumeration.UserRoleModel:
            model = createUserRoleModel(objModel.userId, objModel.roleId);
        break;

        case domainModelEnumeration.RegisterModel:
            model = createRegisterModel(objModel.userId);
        break;

    }

    return model;
}


const userDomainModelFactory = Object.freeze({
    createDomainModel : createDomainModel
});

module.exports = userDomainModelFactory;


//#REGION Private Functions 
const createUserDomainModel_mappedFromUserId = function(userId){
    let _userDomainModel = new userDomainModel();
    _userDomainModel.setUserId(userId);
    return _userDomainModel;
}


const createUserDomainModelMappedFromUserViewModel = function(userViewModel){
    let _userDomainModel = new userDomainModel();
    _userDomainModel.setUserDetailsFromUserViewModel(userViewModel);
    return _userDomainModel;
}


const createRoleModelMappedFromRoleDtoModel = function(roleDtoModel) {
    let _roleDomainModel = new roleDomainModel();
    _roleDomainModel.setRoleId(roleDtoModel.RoleId.value);
    _roleDomainModel.setName(roleDtoModel.Name.value);
    _roleDomainModel.setDescription(roleDtoModel.Description.value);
    _roleDomainModel.setRoleStatusIsActive(roleDtoModel.IsActive.value);

    return _roleDomainModel;
}

const createUserRoleModel = function (userId, roleId) {
    let _userRoleInfo = new userRoleDomainModel();
    let userRoleUuid = uuid();
    _userRoleInfo.setUserRoleId(userRoleUuid);
    _userRoleInfo.setUserId(userId);
    _userRoleInfo.setRoleId(roleId);

    return _userRoleInfo;
}


//Test: DONE
const createRegisterModel = function (userId) {
    let _registerInfo = new registerDomainModel();
    let registerUuid = uuid();
    _registerInfo.setRegisterId(registerUuid);
    _registerInfo.setUserId(userId);
    if (_registerInfo.getRegisterStatusIsActive() === false) {
        _registerInfo.setRegisterIsActive(true);
    }

    return _registerInfo
}


//#ENDREGION Private Functions 