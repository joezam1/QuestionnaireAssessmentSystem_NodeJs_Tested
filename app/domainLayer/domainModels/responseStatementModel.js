const inputTypeInspector = require('../../servicesLayer/validation/inputTypeInspector.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');


const responseStatementModel = function(){

    let _responseStatementId = null;
    let _name = '';
    let _questionnaireId = null;
    let _userId = null;

    const setResponseStatementId = function(responseStatementId){
        _responseStatementId = responseStatementId
    }

    const setName = function(name){
        _name = name;
    }

    const setQuestionnaireId = function(questionnaireId){
        _questionnaireId = questionnaireId;
    }

    const setUserId = function(userId){
        _userId = userId;
    }

    const setResponseStatementDetailsFromResponseStatementViewModel = function(responseStatementViewModel){
        if(inputTypeInspector.isTypeObject( responseStatementViewModel.responseStatementId ) && !inputCommonInspector.objectIsNullOrEmpty(responseStatementViewModel.responseStatementId )){
            setResponseStatementId(responseStatementViewModel.responseStatementId.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseStatementViewModel.name ) && !inputCommonInspector.objectIsNullOrEmpty(responseStatementViewModel.name )){
            setName(responseStatementViewModel.name.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseStatementViewModel.questionnaireId ) && !inputCommonInspector.objectIsNullOrEmpty(responseStatementViewModel.questionnaireId )){
            setQuestionnaireId(responseStatementViewModel.questionnaireId.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseStatementViewModel.userId ) && !inputCommonInspector.objectIsNullOrEmpty(responseStatementViewModel.userId )){
            setUserId(responseStatementViewModel.userId.fieldValue);
        }
    }
   
    const getResponseStatementId = function(){
        return _responseStatementId;
    }

    const getName = function(){
        return _name;
    }

    const getQuestionnaireId = function(){
        return _questionnaireId;
    }

    const getUserId = function(){
        return _userId;
    }


    const getResponseStatementDetails = function(){
        return Object.freeze({
            responseStatementId : getResponseStatementId(),
            name : getName(),
            questionnaireId : getQuestionnaireId(),
            userId : getUserId()
        });
    }


    return Object.freeze({
        setResponseStatementId : setResponseStatementId,
        setName : setName,
        setQuestionnaireId : setQuestionnaireId,
        setUserId : setUserId,
        setResponseStatementDetailsFromResponseStatementViewModel : setResponseStatementDetailsFromResponseStatementViewModel,
        getResponseStatementId :getResponseStatementId,
        getName : getName,
        getQuestionnaireId : getQuestionnaireId,
        getUserId : getUserId,
        getResponseStatementDetails : getResponseStatementDetails

    });

}

module.exports = responseStatementModel;