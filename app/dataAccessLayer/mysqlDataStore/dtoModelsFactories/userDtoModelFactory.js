const dbContext = require('../context/dbContext.js');
const helpers = require('../../../servicesLayer/common/helpers.js');
const monitorService = require('../../../servicesLayer/monitoring/monitorService.js');
const dtoModel = require('../../../servicesLayer/enumerations/dtoModel.js');


let _context = null;


onInit();


const createUserDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModel.UserDtoModel_MappedFromDomain:
            result = createUserDtoModelMappedFromDomain(paramOptions.parameterObject);
        break;

        case dtoModel.UserDtoModel_MappedFromDatabase:
            result = createUsersDtoModelsArrayMappedFromDatabase(paramOptions.parameterArray);
        break;

    }
    return result;
}




const userDtoModelFactory = Object.freeze({
    
    createUserDtoModel:createUserDtoModel
});
module.exports = userDtoModelFactory;

//#REGION Private Functions
function onInit(){
    _context = dbContext.getSequelizeContext();
}



function createUserDtoModelMappedFromDomain(userDomainModel) {
    monitorService.capture('userDomainModel', userDomainModel);

    let dateNow = new Date();
    let resolvedUserStatus = (userDomainModel.getUserStatusIsActive() === true)
        ? userDomainModel.getUserStatusIsActive()
        : userDomainModel.setUserIsActive(true); userDomainModel.getUserStatusIsActive();

    let _userDtoModel = new _context.UserDtoModel();
    monitorService.capture('_userDtoModel', _userDtoModel);
    _userDtoModel.rawAttributes.UserId.value = userDomainModel.getUserId();
    _userDtoModel.rawAttributes.UserId.type.key =  _userDtoModel.rawAttributes.UserId.type.key.toString();
    _userDtoModel.rawAttributes.FirstName.value = userDomainModel.getFirstName();
    _userDtoModel.rawAttributes.FirstName.type.key =  _userDtoModel.rawAttributes.FirstName.type.key.toString();
    _userDtoModel.rawAttributes.MiddleName.value = userDomainModel.getMiddleName();
    _userDtoModel.rawAttributes.MiddleName.type.key =  _userDtoModel.rawAttributes.MiddleName.type.key.toString();
    _userDtoModel.rawAttributes.LastName.value = userDomainModel.getLastName();
    _userDtoModel.rawAttributes.LastName.type.key =  _userDtoModel.rawAttributes.LastName.type.key.toString();
    _userDtoModel.rawAttributes.Username.value = userDomainModel.getUsername();
    _userDtoModel.rawAttributes.Username.type.key =  _userDtoModel.rawAttributes.Username.type.key.toString();
    _userDtoModel.rawAttributes.Email.value = userDomainModel.getEmail();
    _userDtoModel.rawAttributes.Email.type.key =  _userDtoModel.rawAttributes.Email.type.key.toString();
    _userDtoModel.rawAttributes.Password.value = userDomainModel.getPassword();
    _userDtoModel.rawAttributes.Password.type.key =  _userDtoModel.rawAttributes.Password.type.key.toString();
    _userDtoModel.rawAttributes.Sex.value = userDomainModel.getSex();
    _userDtoModel.rawAttributes.Sex.type.key =  _userDtoModel.rawAttributes.Sex.type.key.toString();
    _userDtoModel.rawAttributes.IsActive.value = resolvedUserStatus;
    _userDtoModel.rawAttributes.IsActive.type.key =  _userDtoModel.rawAttributes.IsActive.type.key.toString();
    _userDtoModel.rawAttributes.UTCDateCreated.value = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    _userDtoModel.rawAttributes.UTCDateCreated.type.key =  _userDtoModel.rawAttributes.UTCDateCreated.type.key.toString();
    _userDtoModel.rawAttributes.UTCDateUpdated.value = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    _userDtoModel.rawAttributes.UTCDateUpdated.type.key =  _userDtoModel.rawAttributes.UTCDateUpdated.type.key.toString();

    let clonedAttributes = JSON.parse(JSON.stringify(_userDtoModel.rawAttributes));
    return clonedAttributes;
}

function createUsersDtoModelsArrayMappedFromDatabase(databaseResultArray) {
    let allUsersDtoModels = [];
    for (let a = 0; a < databaseResultArray.length; a++) {
        let userDatabase = databaseResultArray[a];
        monitorService.capture('userDatabase', userDatabase);
        let _userDtoModel =new _context.UserDtoModel();
        monitorService.capture('_userDtoModel', _userDtoModel);
        _userDtoModel.rawAttributes.UserId.value = userDatabase.UserId;
        _userDtoModel.rawAttributes.FirstName.value = userDatabase.FirstName;
        _userDtoModel.rawAttributes.MiddleName.value = userDatabase.MiddleName;
        _userDtoModel.rawAttributes.LastName.value = userDatabase.LastName;
        _userDtoModel.rawAttributes.Username.value = userDatabase.Username;
        _userDtoModel.rawAttributes.Email.value = userDatabase.Email;
        _userDtoModel.rawAttributes.Password.value = userDatabase.Password;
        _userDtoModel.rawAttributes.Sex.value = userDatabase.Sex;
        _userDtoModel.rawAttributes.IsActive.value = (userDatabase.IsActive !== 0);
        _userDtoModel.rawAttributes.UTCDateCreated.value = userDatabase.UTCDateCreated;
        _userDtoModel.rawAttributes.UTCDateUpdated.value = userDatabase.UTCDateUpdated;

        let clonedAttributes = JSON.parse(JSON.stringify(_userDtoModel.rawAttributes));
        allUsersDtoModels.push(clonedAttributes);
    }

    return allUsersDtoModels;
}

//#ENDREGION Private Functions