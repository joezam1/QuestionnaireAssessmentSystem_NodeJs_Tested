

const questionnaireModel = function(){
    let _questionnaireId = null;
    let _questionnaireIndex = 0;
    let _name = '';
    let _description = '';

    let setQuestionnaireId = function(questionnaireId){
        _questionnaireId = questionnaireId;
    }

    let setQuestionnaireIndex = function(questionnaireIndex){
        _questionnaireIndex = questionnaireIndex;
    }

    let setName = function(name){
        _name = name;
    }

    let setDescription = function(description){
        _description = description;
    }

    let getQuestionnaireId = function(){
        return _questionnaireId;
    }

    let getQuestionnaireIndex = function(){
        return _questionnaireIndex;
    }

    let getName = function(){
        return _name;
    }

    let getDescription = function(){
        return _description;
    }

    let getQuestionnaireModelObj = function(){
        return {
            QuestionnaireId: _questionnaireId,
            QuestionnaireIndex :_questionnaireIndex,
            Name : _name,
            Description : _description
        }

    }

    return Object.freeze({
        setQuestionnaireId :setQuestionnaireId,
        setQuestionnaireIndex : setQuestionnaireIndex,
        setName : setName,
        setDescription : setDescription,
        getQuestionnaireId : getQuestionnaireId,
        getQuestionnaireIndex : getQuestionnaireIndex,
        getName : getName,
        getDescription : getDescription,
        getQuestionnaireModelObj :getQuestionnaireModelObj

    });
}

module.exports = questionnaireModel;