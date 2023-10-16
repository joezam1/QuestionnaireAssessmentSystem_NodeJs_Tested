



function questionModel(){
    let _questionId = null;
    let _questionNumber = null;
    let _text = null;
    let _sectionId = null;
    let _categorySubcategoryObj = {
        CategorySubcategoryId: null,
        CategoryObj: {
            CategoryId: null,
            Name: '',
            Description:''
        },
        SubcategoryObj: {
            SubcategoryId: null,
            Name:'',
            Description:''
        }
    }

    const setQuestionId = function(questionId){
        _questionId = questionId;
    };

    const setQuestionNumber = function(questionNumber){
        _questionNumber = questionNumber;
    };

    const setText = function(text){
        _text = text;
    }; 

    const setSectionId = function(sectionId){
        _sectionId = sectionId;
    } 

    const setCategorySubcategoryId = function(categorySubcategoryId){
        _categorySubcategoryObj.CategorySubcategoryId = categorySubcategoryId;
    }

    const setCategoryObj = function(categoryObj){
        _categorySubcategoryObj.CategoryObj.CategoryId = categoryObj.CategoryId.value;
        _categorySubcategoryObj.CategoryObj.Name = categoryObj.Name.value;
        _categorySubcategoryObj.CategoryObj.Description = categoryObj.Description.value;

    }

    const setSubcategoryObj = function(subcategoryObj){
        _categorySubcategoryObj.SubcategoryObj.SubcategoryId = subcategoryObj.SubcategoryId.value;
        _categorySubcategoryObj.SubcategoryObj.Name = subcategoryObj.Name.value;
        _categorySubcategoryObj.SubcategoryObj.Description = subcategoryObj.Description.value;
    }


    const getQuestionId = function(){
        return _questionId;
    }

    const getQuestionNumber = function(){
        return _questionNumber;
    }

    const getText = function(){
        return _text;
    }

    const getSectionId = function(){
        return _sectionId;
    }

    const getCategoryObj = function(){
        return _categorySubcategoryObj.CategoryObj;
    }
    const getSubcategoryObj = function(){
        return _categorySubcategoryObj.SubcategoryObj;
    }

    const getQuestionModelObj = function(){
        return {
            QuestionId: _questionId,
            QuestionNumber: _questionNumber,
            Text: _text,
            SectionId: _sectionId,
            CategorySubcategory: _categorySubcategoryObj
        }
    }

    return Object.freeze({
        setQuestionId: setQuestionId,
        setQuestionNumber : setQuestionNumber,
        setText : setText,
        setSectionId : setSectionId,
        setCategorySubcategoryId : setCategorySubcategoryId,
        setCategoryObj : setCategoryObj,
        setSubcategoryObj : setSubcategoryObj,
        getQuestionId : getQuestionId,
        getQuestionNumber : getQuestionNumber,
        getText : getText,
        getSectionId : getSectionId,
        getCategoryObj : getCategoryObj,
        getSubcategoryObj : getSubcategoryObj,
        getQuestionModelObj : getQuestionModelObj
    });
}

module.exports = questionModel;