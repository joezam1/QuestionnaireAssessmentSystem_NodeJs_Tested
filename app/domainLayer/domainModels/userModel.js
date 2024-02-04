const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');
const inputTypeInspector = require('../../servicesLayer/validation/inputTypeInspector.js');

const userModel = function () {
    let _userId = '';
    let _firstName = '';
    let _middleName = '';
    let _lastName = '';
    let _username = '';
    let _email = '';
    let _password = '';
    let _sex = null;
    let _isActive = false


    const setUserId = function(userId){
        _userId = userId;
    }

    const setFirstName= function(firstName){
        _firstName = firstName;
    }

    const setMiddleName= function(middleName){
        _middleName = middleName;
    }

    const setLastName= function(lastName){
        _lastName = lastName;
    }

    const setUsername = function(username){
        _username = username;
    }

    const setEmail = function(email){
        _email = email;
    }

    const setPassword = function(password){
        _password = password;
    }

    const setSex = function(sex){
        _sex = sex;
    }

    const setUserIsActive = function(status){
        _isActive = status;
    }

    const setUserDetailsFromUserViewModel = function(userViewModel){
        if(inputTypeInspector.isTypeObject( userViewModel.firstName ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.firstName )){
            setFirstName(userViewModel.firstName.fieldValue);
        }
        if(inputTypeInspector.isTypeObject( userViewModel.middleName ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.middleName )){
            setMiddleName(userViewModel.middleName.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( userViewModel.lastName ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.lastName )){
            setLastName(userViewModel.lastName.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( userViewModel.username ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.username )){
            setUsername(userViewModel.username.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( userViewModel.email ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.email )){
            setEmail(userViewModel.email.fieldValue);
        }
        if(inputTypeInspector.isTypeObject( userViewModel.password ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.password )){
            setPassword(userViewModel.password.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( userViewModel.sex ) && !inputCommonInspector.objectIsNullOrEmpty(userViewModel.sex )){
            setSex(userViewModel.sex.fieldValue);
        }

        setUserIsActive(true);
    }

    const getUserId = function(){
        return _userId;
    }

    const getFirstName = function(){
        return _firstName;
    }

    const getMiddleName = function(){
        return _middleName;
    }

    const getLastName = function(){
        return _lastName;
    }

    const getUsername = function(){
        return _username;
    }

    const getEmail = function(){
        return _email;
    }

    const getPassword = function(){
        return _password;
    }

    const getSex = function(){
        return _sex;
    }

    const getUserStatusIsActive = function(){
        return _isActive;
    }

    const getUserDetails = function(){
        return Object.freeze({
            firstName:getFirstName(),
            middleName:getMiddleName(),
            lastName:getLastName(),
            username:getUsername(),
            emal:getEmail(),
            password:getPassword(),
            sex:getSex(),
            isActive: getUserStatusIsActive()
        });
    }

    return Object.freeze({
        setUserDetailsFromUserViewModel : setUserDetailsFromUserViewModel,
        getUserDetails : getUserDetails,
        setUserId : setUserId,
        setFirstName : setFirstName,
        setMiddleName : setMiddleName,
        setLastName : setLastName,
        setUsername : setUsername,
        setEmail : setEmail,
        setPassword : setPassword,
        setSex: setSex,
        setUserIsActive : setUserIsActive,
        getUserId : getUserId,
        getFirstName : getFirstName,
        getMiddleName : getMiddleName,
        getLastName : getLastName,
        getUsername : getUsername,
        getEmail : getEmail,
        getPassword : getPassword,
        getSex: getSex,
        getUserStatusIsActive : getUserStatusIsActive
    });
}

module.exports = userModel;