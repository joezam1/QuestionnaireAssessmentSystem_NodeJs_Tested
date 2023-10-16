

const sectionModel = function(){
    let _sectionId = null;
    let _sectionIndex = 0;
    let _questionnaireId = null;
    let _name = '';
    let _description = '';

    let setSectionId = function( sectionId ){
        _sectionId = sectionId;
    }

    let setSectionIndex = function(sectionIndex){
        _sectionIndex = sectionIndex;
    }

    let setQuestionnaireId = function(questionnaireId){
        _questionnaireId = questionnaireId;
    }

    let setName = function(name){
        _name = name;
    }

    let setDescription = function(description){
        _description = description;
    }

    let getSectionId = function(){
        return _sectionId;
    }

    let getSectionIndex = function(){
        return _sectionIndex;
    }

    let getQuestionnaireId = function(){
        return _questionnaireId;
    }

    let getName = function(){
        return _name;
    }

    let getDescription = function(){
        return _description;
    }

    let getSectionModelObj = function(){
        return {
            SectionId: _sectionId,
            SectionIndex: _sectionIndex,
            QuestionnaireId: _questionnaireId,
            Name : _name,
            Description : _description
        }

    }

    return Object.freeze({
        setSectionId : setSectionId,
        setSectionIndex :setSectionIndex,
        setQuestionnaireId :setQuestionnaireId,
        setName : setName,
        setDescription : setDescription,
        getSectionId : getSectionId,
        getSectionIndex : getSectionIndex,
        getQuestionnaireId : getQuestionnaireId,
        getName : getName,
        getDescription : getDescription,
        getSectionModelObj :getSectionModelObj

    });
}

module.exports = sectionModel;