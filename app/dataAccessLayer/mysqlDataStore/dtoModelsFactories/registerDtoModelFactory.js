const helpers = require('../../../servicesLayer/common/helpers.js');
const dbContext = require('../context/dbContext.js');
const dtoModelEnumeration = require('../../../servicesLayer/enumerations/dtoModel.js');

let _context = null;


onInit();


const createRegisterDtoModel = function(dtoModelEnum, paramOptions){

    let result = null;
    switch(dtoModelEnum){

        case dtoModelEnumeration.RegisterDtoModel_MappedFromDomain:
            result = createRegisterDtoModelMappedFromDomain(paramOptions.parameterObject);
        break;
    }
    return result;

}


const registerDtoModelFactory = {
    createRegisterDtoModel : createRegisterDtoModel
}

module.exports = registerDtoModelFactory;
//REGION Private Functions

function onInit(){
    _context = dbContext.getSequelizeContext();
}


const createRegisterDtoModelMappedFromDomain = function(registerDomainModel){
    let dateNow = new Date();
    let resolvedRegisterStatus = (registerDomainModel.getRegisterStatusIsActive() === true)
    ? registerDomainModel.getRegisterStatusIsActive()
    : registerDomainModel.setRegisterIsActive(true); registerDomainModel.getRegisterStatusIsActive() ;

    let _registerDto = new _context.RegisterDtoModel();
    _registerDto.rawAttributes.RegisterId.value = registerDomainModel.getRegisterId();
    _registerDto.rawAttributes.RegisterId.type.key =  _registerDto.rawAttributes.RegisterId.type.key.toString();
    _registerDto.rawAttributes.UserId.value = registerDomainModel.getUserId();
    _registerDto.rawAttributes.UserId.type.key =  _registerDto.rawAttributes.UserId.type.key.toString();
    _registerDto.rawAttributes.IsActive.value = resolvedRegisterStatus;
    _registerDto.rawAttributes.IsActive.type.key =  _registerDto.rawAttributes.IsActive.type.key.toString();
    _registerDto.rawAttributes.UTCDateCreated.value = helpers.convertLocaleDateToUTCFormatForDatabase(dateNow);
    _registerDto.rawAttributes.UTCDateCreated.type.key =  _registerDto.rawAttributes.UTCDateCreated.type.key.toString();

    let clonedAttributes = JSON.parse(JSON.stringify(_registerDto.rawAttributes));
    return clonedAttributes;
}

//ENDREGION Private Functions