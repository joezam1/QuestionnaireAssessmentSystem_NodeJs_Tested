

const questionChoiceModel = function(){
    let _questionChoiceId = null;
    let _questionId = null;
    let _choiceObj = {
        ChoiceId : null,
        CategorySubcategoryId : null,
        Name: null,
        Value: 0
    }
    let _categoryObj = {
        CategoryId: null,
        Name:'',
        Description: ''
    }
    let _subcategoryObj={
        SubcategoryId: null,
        Name: '',
        Description: ''
    }

    const setQuestionChoiceId = function(questionChoiceId){
        _questionChoiceId = questionChoiceId;
    }

    const setQuestionId = function(questionId){
        _questionId = questionId;
    }


    const setChoiceId = function(choiceId){
        _choiceObj.ChoiceId = choiceId
    }

    const setChoiceObj = function(choiceObj){
        _choiceObj.CategorySubcategoryId = choiceObj.CategorySubcategoryId.value;
        _choiceObj.Name = choiceObj.Name.value;
        _choiceObj.Value = choiceObj.Value.value;
    }

    const setCategoryObj = function(categoryObj){
        _categoryObj.CategoryId = categoryObj.CategoryId.value;
        _categoryObj.Name = categoryObj.Name.value;
        _categoryObj.Description = categoryObj.Description.value;
    }

    const setSubcategoryObj = function(subcategoryObj){
        _subcategoryObj.SubcategoryId = subcategoryObj.SubcategoryId.value;
        _subcategoryObj.Name = subcategoryObj.Name.value;
        _subcategoryObj.Description = subcategoryObj.Description.value;
    }

    const getQuestionChoiceId = function(){
        return _questionChoiceId;
    }

    const getQuestionId = function(){
        return _questionId;
    }

    const getChoiceId = function(){
        return _choiceObj.ChoiceId;
    }

    const getChoiceObj = function(){
        return _choiceObj;
    }

    const getCategoryObj = function(){
        return _categoryObj;
    }

    const getSubcategoryObj = function(){
        return _subcategoryObj;
    }

    const getQuestionChoiceModelObj = function(){
        return {
            QuestionChoiceId: _questionChoiceId,
            QuestionId: _questionId,
            ChoiceObj :_choiceObj,
            CategoryObj :_categoryObj,
            SubcategoryObj:_subcategoryObj
        }
    }


    return Object.freeze({
        setQuestionChoiceId : setQuestionChoiceId,
        setQuestionId : setQuestionId,
        setChoiceId : setChoiceId,
        setChoiceObj : setChoiceObj,
        setCategoryObj : setCategoryObj,
        setSubcategoryObj : setSubcategoryObj,
        getQuestionChoiceId :getQuestionChoiceId,
        getQuestionId: getQuestionId,
        getChoiceId : getChoiceId,
        getChoiceObj : getChoiceObj,
        getCategoryObj : getCategoryObj,
        getSubcategoryObj : getSubcategoryObj,
        getQuestionChoiceModelObj : getQuestionChoiceModelObj

    });
}

module.exports = questionChoiceModel;