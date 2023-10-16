
const questionnaireRepository = require('../../dataAccessLayer/repositories/qustionnaireRepository.js');
const sectionRepository = require('../../dataAccessLayer/repositories/sectionRepository.js');
const questionRepository = require('../../dataAccessLayer/repositories/questionRepository.js');
const questionChoiceRepository = require('../../dataAccessLayer/repositories/questionChoiceRepository.js');
const questionnaireDomainHelper = require('./questionnaireDomainHelper.js');



const createQuestionnaireByIdAsync = async function(uuid){   
    let questionnaireDtoModel = await questionnaireRepository.getQuestionnaireInfoByIdAsync(uuid);
    let questionnaireModel = questionnaireDomainHelper.createQuestionnaireModelArray(questionnaireDtoModel);

    let allSectionsDtoModel = await sectionRepository.getAllSectionsByQuestionnaireIdAsync(uuid);
    let allSectionsModel = questionnaireDomainHelper.createAllSectionsModelArray(allSectionsDtoModel);

    let allsectionsIdsArray = getAllSectionIds(allSectionsDtoModel);
    let allQuestionsDtoModel = await questionRepository.getAllQuestionsByAllSectionsIdAsync(allsectionsIdsArray);

    let allQuestionsModel = questionnaireDomainHelper.createQuestionModelArray(allQuestionsDtoModel);
    let allQuestionIDsArray = getlAllQuestionsIds(allQuestionsDtoModel);
    
    let allQuestionChoicesDtoModel = await questionChoiceRepository.getAllQuestionChoicesByAllQuestionsIdAsync(allQuestionIDsArray);
    let allQuestionChoicesModel = questionnaireDomainHelper.createQuestionChoicesModelArray(allQuestionChoicesDtoModel);

    const resObj = {
        questionnaire :questionnaireModel,
        sections : allSectionsModel,
        questions : allQuestionsModel,
        choices : allQuestionChoicesModel
    };

    let resultViewModelObj = createQuestionnaireObject(resObj);
    return resultViewModelObj;
}

const questionnaireManager = Object.freeze({
    createQuestionnaireByIdAsync: createQuestionnaireByIdAsync
});
module.exports = questionnaireManager;


//#REGION Private Fuctions 
function getAllSectionIds(allSectionsDtoModelArray){
    let allSectionIds = [];
    for(let a = 0 ; a < allSectionsDtoModelArray.length; a++){
        let sectionId = allSectionsDtoModelArray[a].SectionId.value;
        allSectionIds.push(sectionId);
    }

    return allSectionIds;
}

function getlAllQuestionsIds(allQuestionsDtoModelArray){
    let allQuestionIds = [];
    for(let a = 0 ; a < allQuestionsDtoModelArray.length; a++){
        let questionId = allQuestionsDtoModelArray[a].QuestionId.value;
        allQuestionIds.push(questionId);
    }

    return allQuestionIds;
}

function createQuestionnaireObject(questionnaireData){

    let questionnaireInfo = questionnaireData.questionnaire;
    let sections = questionnaireData.sections;
    let questions = questionnaireData.questions;
    let choices = questionnaireData.choices;

    let questionsWithChoicesArray = [];
    for(let a = 0; a < questions.length; a++){
        let selectedChoicesArray = choices.filter(function(choiceObj){       
            return (choiceObj.QuestionId == questions[a].QuestionId);
        });
        if(selectedChoicesArray.length>0 && selectedChoicesArray != null ){
            let selectedQuestion = questions[a];
            selectedQuestion.Choices = selectedChoicesArray;

            questionsWithChoicesArray.push(selectedQuestion);
        }
    }
    
    let sectionsWithQuestions = [];
    for(let i = 0; i< sections.length; i++){
        let selectedQuestionsArray = questionsWithChoicesArray.filter(function(questionObj){
            return (questionObj.SectionId === sections[i].SectionId )
        });
        if(selectedQuestionsArray.length>0 && selectedQuestionsArray != null){
            
            let selectedSection = sections[i];
            selectedSection.Questions = selectedQuestionsArray;

            sectionsWithQuestions.push(selectedSection);            
        }
    }

    questionnaireInfo.Sections = sectionsWithQuestions;
    return questionnaireInfo;
    
}

//#ENDREGION Private Fuctions 