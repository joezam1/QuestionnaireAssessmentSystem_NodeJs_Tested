
const questionnaireRepository = require('../../dataAccessLayer/repositories/questionnaireRepository.js');
const sectionRepository = require('../../dataAccessLayer/repositories/sectionRepository.js');
const questionRepository = require('../../dataAccessLayer/repositories/questionRepository.js');
const questionChoiceRepository = require('../../dataAccessLayer/repositories/questionChoiceRepository.js');

const domainModel = require('../../servicesLayer/enumerations/domainModel.js');
const questionnaireDomainModelFactory = require('../domainFactories/questionnaireDomainModelFactory.js');
const sectionDomainModelFactory = require('../domainFactories/sectionDomainModelFactory.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');
const sexType = require('../../servicesLayer/enumerations/sexType.js');



const createQuestionnaireByIdAsync = async function(uuid){   
    const questionnaireDtoModelArray = await questionnaireRepository.getQuestionnaireInfoByIdAsync(uuid);    
    const resultViewModelObj = await buildQuestionnaireAsync(questionnaireDtoModelArray);
    return resultViewModelObj;
}


const createQuestionnaireByIndexAsync = async function(request){   
    const index = request.params.INDEX;
    const questionnaireDtoModelArray = await questionnaireRepository.getQuestionnaireInfoByIndexAsync(index);
    //let sessionInfo = await sessionDomainManager.getSessionInfoAsync(request);
    //const userId = sessionInfo.result.userId.fieldValue;
    //let userInfoArray = await userDomainManager.resolveGetUserByIdAsync(userId);
    //const userInfo = userInfoArray[0];

    //TODO: Update questionnaire based on the type of user.
    const resultViewModelObj = await buildQuestionnaireAsync( questionnaireDtoModelArray);
    return resultViewModelObj;
}


const createQuestionnaireByIndex_NoSexTypeAsync = async function(request){   
    const index = request.params.INDEX;
    const questionnaireDtoModelArray = await questionnaireRepository.getQuestionnaireInfoByIndexAsync(index);
    const resultViewModelObj = await buildQuestionnaire_noSexTypeAsync( questionnaireDtoModelArray);
    return resultViewModelObj;
}

const questionnaireManager = Object.freeze({
    createQuestionnaireByIdAsync: createQuestionnaireByIdAsync,
    createQuestionnaireByIndexAsync : createQuestionnaireByIndexAsync,
    createQuestionnaireByIndex_NoSexTypeAsync : createQuestionnaireByIndex_NoSexTypeAsync
});
module.exports = questionnaireManager;


//#REGION Private Fuctions 
async function buildQuestionnaire_noSexTypeAsync(questionnaireDtoModelArray){
    const questionnaireDtoModel = questionnaireDtoModelArray[0];
   
    let allQuestionnairesModelArray = questionnaireDomainModelFactory.createModelArray(domainModel.QuestionnaireModel, questionnaireDtoModelArray);
    let singleQuestionnaireModel = allQuestionnairesModelArray[0];

    //ERROR
//problems getting sections by Questionnaire ID   
    let objModel = {
        QuestionnaireId : questionnaireDtoModel.QuestionnaireId.value
    }
    const sectionDomainModel = sectionDomainModelFactory.createDomainModel(domainModel.SectionModel_MappedFromQuestionnaireId, objModel);

    let allSectionsDtoModelArray = await sectionRepository.getAllSectionsByQuestionnaireIdAsync(sectionDomainModel);
    let allSectionsModelArray = questionnaireDomainModelFactory.createModelArray( domainModel.SectionModel,  allSectionsDtoModelArray);

    let allsectionsIdsNoSexTypeArray = getAllSectionIds_noSexType(allSectionsDtoModelArray);
    let allQuestionsDtoModelArray = await questionRepository.getAllQuestionsByAllSectionsIdAsync(allsectionsIdsNoSexTypeArray);
    let allQuestionsModelArray = questionnaireDomainModelFactory.createModelArray( domainModel.QuestionModel, allQuestionsDtoModelArray);

    let allQuestionIDsArray = getlAllQuestionsIds(allQuestionsDtoModelArray);
    
    let allQuestionChoicesDtoModelArray = await questionChoiceRepository.getAllQuestionChoicesByAllQuestionsIdAsync(allQuestionIDsArray);
    let allQuestionChoicesModelArray = questionnaireDomainModelFactory.createModelArray(domainModel.QuestionChoiceModel, allQuestionChoicesDtoModelArray);

    const resObj = {
        questionnaire :singleQuestionnaireModel,
        sections : allSectionsModelArray,
        questions : allQuestionsModelArray,
        choices : allQuestionChoicesModelArray
    };

    let resultViewModelObj = createQuestionnaireObject(resObj);
    const result =  httpResponseService.getResponseResultStatus(resultViewModelObj , httpResponseStatus._201created);
    return result;
}

function getAllSectionIds_noSexType(allSectionsDtoModelArray){
    let allSectionIds = [];
    for(let a = 0 ; a < allSectionsDtoModelArray.length; a++){
        let selectedSection = allSectionsDtoModelArray[a].Name.value.toLowerCase();
        const maleSex = sexType[sexType.Male].toLowerCase();
        const femaleSex = sexType[sexType.Female].toLowerCase();
        if(selectedSection != maleSex && selectedSection != femaleSex){
            let sectionId = allSectionsDtoModelArray[a].SectionId.value;
            allSectionIds.push(sectionId);
        }
        
    }

    return allSectionIds;
}



async function buildQuestionnaireAsync(questionnaireDtoModelArray){
    const questionnaireDtoModel = questionnaireDtoModelArray[0];
    
    const allQuestionnairesModelArray = questionnaireDomainModelFactory.createModelArray(domainModel.QuestionnaireModel, questionnaireDtoModelArray);
    const singleQuestionnaireModel = allQuestionnairesModelArray[0];

    let objModel = {
        QuestionnaireId : questionnaireDtoModel.QuestionnaireId.value
    }
    const sectionDomainModel = sectionDomainModelFactory.createDomainModel(domainModel.SectionModel_MappedFromQuestionnaireId, objModel);
    
    const allSectionsDtoModelArray = await sectionRepository.getAllSectionsByQuestionnaireIdAsync(sectionDomainModel);
    const allSectionsModelArray = questionnaireDomainModelFactory.createModelArray( domainModel.SectionModel,  allSectionsDtoModelArray);

    const allsectionsIdsArray = getAllSectionIds(allSectionsDtoModelArray);
    const allQuestionsDtoModelArray = await questionRepository.getAllQuestionsByAllSectionsIdAsync(allsectionsIdsArray);
    const allQuestionsModelArray = questionnaireDomainModelFactory.createModelArray( domainModel.QuestionModel, allQuestionsDtoModelArray);

    const allQuestionIDsArray = getlAllQuestionsIds(allQuestionsDtoModelArray);
    
    const allQuestionChoicesDtoModelArray = await questionChoiceRepository.getAllQuestionChoicesByAllQuestionsIdAsync(allQuestionIDsArray);
    const allQuestionChoicesModelArray = questionnaireDomainModelFactory.createModelArray(domainModel.QuestionChoiceModel, allQuestionChoicesDtoModelArray);

    const resObj = {
        questionnaire :singleQuestionnaireModel,
        sections : allSectionsModelArray,
        questions : allQuestionsModelArray,
        choices : allQuestionChoicesModelArray
    };

    const resultViewModelObj = createQuestionnaireObject(resObj);
    const result =  httpResponseService.getResponseResultStatus(resultViewModelObj , httpResponseStatus._201created);
    return result;
}

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
        let selectedChoicesArray = choices.filter(function(choiceObj, index){
               
            return (choiceObj.QuestionId == questions[a].QuestionId);
        });
        if(selectedChoicesArray.length>0 && selectedChoicesArray != null ){
            for(let i = 0; i< selectedChoicesArray.length; i++){
                selectedChoicesArray[i].Index = `${a}_${i}`;
            }

            let selectedQuestion = questions[a];
            selectedQuestion.Choices = selectedChoicesArray;
            selectedQuestion.Index = a;
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
    questionnaireInfo.TotalQuestions = questionsWithChoicesArray.length;
    return questionnaireInfo;
    
}

//#ENDREGION Private Fuctions 