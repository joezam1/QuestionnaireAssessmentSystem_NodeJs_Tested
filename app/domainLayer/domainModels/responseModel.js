const inputTypeInspector = require('../../servicesLayer/validation/inputTypeInspector.js');
const inputCommonInspector = require('../../servicesLayer/validation/inputCommonInspector.js');


const responseModel = function(){
    let _responseNumber = 0;
    let _responseIndex = 0;
    let _responseStatementId = '';
    let _userId = '';
    let _questionChoiceId = '';
    let _questionId = '';
    let _choiceId = '';
    let _questionAsked = '';
    let _answer = '';
    let _value = 0;

    const setResponseNumber = function(responseNumber){
        _responseNumber = responseNumber;
    }

    const setResponseIndex = function(responseIndex){
        _responseIndex = responseIndex;
    }

    const setResponseStatementId = function(responseStatementId){
        _responseStatementId = responseStatementId;
    }

    const setUserId = function(userId){
        _userId = userId;
    }

    const setQuestionChoiceId = function(questionChoiceId){
        _questionChoiceId = questionChoiceId;
    }

    const setQuestionId = function(questionId){
        _questionId = questionId;
    }

    const setChoiceId = function(choiceId){
        _choiceId = choiceId;
    }

    const setQuestionAsked = function(questionAsked){
        _questionAsked = questionAsked;
    }

    const setAnswer = function(answer){
        _answer = answer;
    }

    const setValue = function(value){
        _value = value;
    }

    //=============
    const setResponseDetailsFromResponseViewModel = function(responseViewModel){

        if(inputTypeInspector.isTypeObject( responseViewModel.responseNumber ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.responseNumber )){
            setResponseNumber(responseViewModel.responseNumber.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.responseIndex ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.responseIndex )){
            setResponseIndex(responseViewModel.responseIndex.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.responseStatementId ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.responseStatementId )){
            setResponseStatementId(responseViewModel.responseStatementId.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.userId ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.userId )){
            setUserId(responseViewModel.userId.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.questionChoiceId ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.questionChoiceId )){
            setQuestionChoiceId(responseViewModel.questionChoiceId.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.questionId ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.questionId )){
            setQuestionId(responseViewModel.questionId.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.choiceId ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.choiceId )){
            setChoiceId(responseViewModel.choiceId.fieldValue);
        }


        if(inputTypeInspector.isTypeObject( responseViewModel.questionAsked ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.questionAsked )){
            setQuestionAsked(responseViewModel.questionAsked.fieldValue);
        }


        if(inputTypeInspector.isTypeObject( responseViewModel.answer ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.answer )){
            setAnswer(responseViewModel.answer.fieldValue);
        }

        if(inputTypeInspector.isTypeObject( responseViewModel.value ) && !inputCommonInspector.objectIsNullOrEmpty(responseViewModel.value )){
            setValue(responseViewModel.value.fieldValue);
        }



    }

    //=============
    const getResponseNumber = function(){
        return _responseNumber;
    }

    const getResponseIndex = function(){
        return _responseIndex;
    }

    const getResponseStatementId = function(){
        return _responseStatementId;
    }

    const getUserId = function(){
        return _userId;
    }

    const getQuestionChoiceId = function(){
        return _questionChoiceId;
    }

    const getQuestionId = function(){
        return _questionId;
    }

    const getChoiceId = function(){
        return _choiceId;
    }

    const getQuestionAsked = function(){
        return _questionAsked;
    }

    const getAnswer = function(){
        return _answer;
    }

    const getValue = function(){
        return _value;
    }

    return Object.freeze({

        setResponseNumber : setResponseNumber,
        setResponseIndex : setResponseIndex,
        setResponseStatementId : setResponseStatementId,
        setUserId : setUserId,
        setQuestionChoiceId : setQuestionChoiceId,
        setQuestionId : setQuestionId,
        setChoiceId : setChoiceId,
        setQuestionAsked : setQuestionAsked,
        setAnswer : setAnswer,
        setValue : setValue,
        setResponseDetailsFromResponseViewModel : setResponseDetailsFromResponseViewModel,
        getResponseNumber : getResponseNumber,
        getResponseIndex : getResponseIndex,
        getResponseStatementId : getResponseStatementId,
        getUserId : getUserId,
        getQuestionChoiceId : getQuestionChoiceId,
        getQuestionId : getQuestionId,
        getChoiceId : getChoiceId,
        getQuestionAsked : getQuestionAsked,
        getAnswer : getAnswer,
        getValue : getValue
    });
}

module.exports = responseModel;