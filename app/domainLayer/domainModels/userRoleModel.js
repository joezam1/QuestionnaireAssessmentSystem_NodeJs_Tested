
const userRoleModel = function () {
    let _userRoleId = '';
    let _userId = '';
    let _roleId = '';

    const setUserRoleId= function(userRoleId){
        _userRoleId = userRoleId;
    }

    const setUserId = function(userId){
        _userId = userId;
    }

    const setRoleId = function(roleId){
        _roleId = roleId;
    }

    const getUserRoleId = function(){
        return _userRoleId;
    }

    const getUserId = function(){
        return _userId;
    }

    const getRoleId = function(){
        return _roleId;
    }

    const getUserRoleDetails = function(){
        return {
            userRoleId : getUserRoleId(),
            userId : getUserId(),
            roleId : getRoleId(),
        }
    }

    return Object.freeze({
        setUserRoleId : setUserRoleId,
        setUserId : setUserId,
        setRoleId : setRoleId,
        getUserRoleId : getUserRoleId,
        getUserId : getUserId,
        getRoleId : getRoleId,
        getUserRoleDetails : getUserRoleDetails
    });


}

module.exports = userRoleModel;