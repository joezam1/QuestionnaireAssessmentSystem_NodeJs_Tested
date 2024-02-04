const questionnaireModel = require('../domainModels/questionnaireModel.js');
const sectionModel = require('../domainModels/sectionModel.js');
const questionModel = require('../domainModels/questionModel.js');
const questionChoiceModel = require('../domainModels/questionChoiceModel.js');


const domainModel = require('../../servicesLayer/enumerations/domainModel.js');

 const createModelArray= function(modelEnum, selectedDTOModelArray){

    let result = null;
    switch(modelEnum){

        case domainModel.QuestionnaireModel:
            result = createQuestionnaireModelArray(selectedDTOModelArray);
        break;

        case domainModel.SectionModel:
            result = createAllSectionsModelArray(selectedDTOModelArray);
        break;

        case domainModel.QuestionModel:
            result = createQuestionModelArray(selectedDTOModelArray);
        break;

        case domainModel.QuestionChoiceModel:
            result = createQuestionChoicesModelArray(selectedDTOModelArray);
        break;
    }
    return result;

}


const questionnaireDomainFactory = Object.freeze({

    createModelArray:createModelArray
});

module.exports = questionnaireDomainFactory;




//#REGION Private Functions

let createQuestionnaireModelArray = function( questionnaireDtoModelArray )
{
    let allQuestionnaireModels = [];
    for(let a = 0; a < questionnaireDtoModelArray.length; a++){
        let questionnaire = questionnaireDtoModelArray[a];
        let _questionnaireModel = new questionnaireModel();
        _questionnaireModel.setQuestionnaireId(questionnaire.QuestionnaireId.value);
        _questionnaireModel.setQuestionnaireIndex(questionnaire.QuestionnaireIndex.value);
        _questionnaireModel.setName(questionnaire.Name.value);
        _questionnaireModel.setDescription(questionnaire.Description.value);
        
        let questionnaireInfo = _questionnaireModel.getQuestionnaireModelObj();
        allQuestionnaireModels.push(questionnaireInfo);
    }
    
    return allQuestionnaireModels;
}

let createAllSectionsModelArray = function(sectionsDtoModelArray){
    let allSectionsModels = [];

    for(let a = 0; a< sectionsDtoModelArray.length; a++){
        let section = sectionsDtoModelArray[a];
        let _sectionModel = new sectionModel();
        _sectionModel.setSectionId(section.SectionId.value);
        _sectionModel.setSectionIndex(section.SectionIndex.value);
        _sectionModel.setQuestionnaireId(section.QuestionnaireId.value);
        _sectionModel.setName(section.Name.value);
        _sectionModel.setDescription(section.Description.value);

        let sectionInfo = _sectionModel.getSectionModelObj();
        allSectionsModels.push(sectionInfo);
    }

    return allSectionsModels;

}



let createQuestionModelArray = function(questionsDtoModelArray ){
    let questionModelArray = [];

    for(let a = 0; a < questionsDtoModelArray.length; a++){
        let question = questionsDtoModelArray[a];
        let _questionModel = new questionModel();
        _questionModel.setQuestionId(question.QuestionId.value);
        _questionModel.setQuestionNumber(question.QuestionNumber.value);
        _questionModel.setText(question.Text.value);
        _questionModel.setSectionId(question.SectionId.value);
        _questionModel.setCategorySubcategoryId(question.CategorySubcategoryId.value);
        _questionModel.setCategoryObj(question.CategoryObj);
        _questionModel.setSubcategoryObj(question.SubcategoryObj);

        let questionInfo = _questionModel.getQuestionModelObj();
        questionModelArray.push(questionInfo);
    }
    return questionModelArray;

}


let createQuestionChoicesModelArray = function(questionChoicesDtoModelArray){
    let questionChoicesModelArray = [];
    for(let a = 0 ; a< questionChoicesDtoModelArray.length; a++){
        let questionChoice = questionChoicesDtoModelArray[a];
        
        let _questionChoiceModel = new questionChoiceModel();
        _questionChoiceModel.setQuestionChoiceId(questionChoice.QuestionChoiceId.value);
        _questionChoiceModel.setQuestionId(questionChoice.QuestionId.value);
        _questionChoiceModel.setChoiceId(questionChoice.ChoiceId.value);
        _questionChoiceModel.setChoiceObj(questionChoice.ChoiceObj);
        _questionChoiceModel.setCategoryObj(questionChoice.CategoryObj);
        _questionChoiceModel.setSubcategoryObj(questionChoice.SubcategoryObj);

        let questionChoiceInfo = _questionChoiceModel.getQuestionChoiceModelObj();
        questionChoicesModelArray.push(questionChoiceInfo);

    }
    return questionChoicesModelArray;
}
//#ENDREGION Private Functions