const sessionDomainManager = require('../domainManagers/sessionDomainManager.js');
const responseStatementDomainModelFactory = require('../domainFactories/responseStatementDomainModelFactory.js');
const domainModel = require('../../servicesLayer/enumerations/domainModel.js');
const responseStatementRepository = require('../../dataAccessLayer/repositories/responseStatementRepository.js');
const httpResponseStatus = require('../../servicesLayer/enumerations/httpResponseStatus.js');
const httpResponseService = require('../../servicesLayer/httpProtocol/httpResponseService.js');
const responseStatementViewModel = require('../../presentationLayer/viewModels/responseStatementViewModel.js');
const responseViewModelFactory = require('../../presentationLayer/viewModelFactories/responseViewModelFactory.js');
const responseDomainModelFactory = require('../domainFactories/ResponseDomainModelFactory.js');
const responseStatementResolver = require('../domainResolvers/responseStatementResolver.js');
const categoryRepository = require('../../dataAccessLayer/repositories/categoryRepository.js');
const viewModelEnum = require('../../servicesLayer/enumerations/viewModel.js');



const resolveResponseStatementAsync = async function(request){
    const responseStatement = request.body;
    const bearerSessionToken = request.get('Authorization');

    const userIdResponse = await getUserIdBySessionTokenAsync( bearerSessionToken );
    if(userIdResponse.status === httpResponseStatus._401unauthorized){
        return userIdResponse;
    }
    responseStatement.UserId = userIdResponse.result;    
    
    let savedResponseResult = await resolveSaveResponseStatementAsync(responseStatement);
    if(savedResponseResult.status == httpResponseStatus._201created || savedResponseResult.status == httpResponseStatus._200ok  ){
        //if result OK, then create the Report to be sent to the Client.
        let assessmentReportResult = await resolveCreateResponseReportAsync(responseStatement);
        return assessmentReportResult;
    }

    return savedResponseResult;    
}



const responseStatementManager = Object.freeze({
    resolveResponseStatementAsync : resolveResponseStatementAsync
});

module.exports = responseStatementManager;


//#REGION Private Functions

async function getUserIdBySessionTokenAsync( bearerSessionToken ){
    const sessionInfo = await sessionDomainManager.getSessionInfoAsync(bearerSessionToken);

    if(sessionInfo.status !== httpResponseStatus._200ok){
        return httpResponseService.getResponseResultStatus(sessionInfo, httpResponseStatus._401unauthorized);
    }

    return httpResponseService.getResponseResultStatus( sessionInfo.result.userId.fieldValue, httpResponseStatus._200ok);
}

async function resolveSaveResponseStatementAsync ( responseStatementObj ){    
    const responseStatement = JSON.parse(JSON.stringify(responseStatementObj));
    const responseStatementInfoArray = await resolveGetResponseStatementByIdAsync(responseStatement);
    if(responseStatementInfoArray.status === httpResponseStatus._200ok && responseStatementInfoArray.result.length == 0){

        const _responseStatementViewModel = new responseStatementViewModel(responseStatement);       
        const _responseStatementDomainModel = responseStatementDomainModelFactory.createDomainModel(domainModel.ResponseStatementModel_MappedFromResponseStatementViewModel, _responseStatementViewModel);

        const _responseViewModelArray = responseViewModelFactory.createViewModel(viewModelEnum.ResponseViewModelArray_MappedFromResponseStatement,responseStatement);
        
        let _responsesModelArray = [];
        for(let a = 0; a < _responseViewModelArray.length; a++){
            let _responseModel = responseDomainModelFactory.createDomainModel(domainModel.ResponseModel_MappedFromResponseViewModel, _responseViewModelArray[a]);
            _responsesModelArray.push(_responseModel);          
        }        
         //not saved, we save it to the database.
         const responseStatementSavedResult = await responseStatementResolver.saveResponseStatementAndResponsesToDatabaseAsync(_responseStatementDomainModel , _responsesModelArray);
        return responseStatementSavedResult; 
    }
    
    return responseStatementInfoArray;
}

async function resolveGetResponseStatementByIdAsync(responseStatementObj){

    const objModel = {
        responseStatementId : responseStatementObj.ResponseStatementId
    }

    const responseStatementModel = responseStatementDomainModelFactory.createDomainModel(domainModel.ResponseStatementModel_MappedFromResponseStatementId, objModel);
    const responseStatementResultArray = await responseStatementRepository.getResponseStatementByIdAsync(responseStatementModel);
    if (responseStatementResultArray instanceof Error) {
        return httpResponseService.getResponseResultStatus(responseStatementResultArray, httpResponseStatus._400badRequest);
    }

    return httpResponseService.getResponseResultStatus(responseStatementResultArray, httpResponseStatus._200ok);
}

async function resolveCreateResponseReportAsync(responseStatementObj){
    const sectionsArray = responseStatementObj.Sections;
    let allCategories = await categoryRepository.getAllCategoriesAsync();
    let activeCategories = removeCategoryFromCategories(allCategories,  "All Characters");

    let resultCategoriesWithInitialChoicesArray = getCalculatedTotalInitialChoicesPerCategory(sectionsArray, activeCategories );
    let resultCategoriesWithSelectedChoicesArray = getCalculatedTotalSelectedChoicesPerCategory(sectionsArray, activeCategories );

    //calculate percentages of selectedChoices / initialChoices by categories.
    let reportAssessmentResultByCategory = createAssessmentResultReport(resultCategoriesWithInitialChoicesArray, resultCategoriesWithSelectedChoicesArray);
    //then create a viewCategoryWithChoices ViewModel

    return httpResponseService.getResponseResultStatus(reportAssessmentResultByCategory, httpResponseStatus._200ok);;
}

function removeCategoryFromCategories(allCategories , categoryNameForRemoval){
    let allCategoriesArray = JSON.parse(JSON.stringify(allCategories));    
    const index = allCategoriesArray.findIndex((category)=>{        
        return (category.Name.value === categoryNameForRemoval);        
    });
    if (index > -1) { // only splice array when item is found
        allCategoriesArray.splice(index, 1); // 2nd parameter means remove one item only        
    }

    return allCategoriesArray;
}

function getCalculatedTotalInitialChoicesPerCategory(responseStatementSectionsArray , allCategoriesArray){
    const sectionsArray = JSON.parse(JSON.stringify(responseStatementSectionsArray));
    let categoriesArray = JSON.parse(JSON.stringify(allCategoriesArray));

    let allQuestionsArray = getAllQuestionsFromAllSections(sectionsArray); 
    let allChoicesFromAllQuestionsArray = getAllChoicesFromAllQuestions(allQuestionsArray);
    let allCategoriesWithInitialChoicesArray = getAllCategoriesWithAssignedChoices(categoriesArray, allChoicesFromAllQuestionsArray);
    
    return allCategoriesWithInitialChoicesArray;
}

function getCalculatedTotalSelectedChoicesPerCategory(responseStatementSectionsArray , allCategoriesArray){  
    const sectionsArray = JSON.parse(JSON.stringify(responseStatementSectionsArray));
    const categoriesArray = JSON.parse(JSON.stringify(allCategoriesArray));

    const allQuestionsArray = getAllQuestionsFromAllSections(sectionsArray);        
    let allAnsweredQuestionsArray = getAnsweredQuestions(allQuestionsArray);   

    let allSelectedChoicesObjArray = getSelectedChoicesInQuestions(allAnsweredQuestionsArray);
   
    let categoriesWithSelectedChoicesArray = getAllCategoriesWithAssignedChoices(categoriesArray, allSelectedChoicesObjArray);  
    return categoriesWithSelectedChoicesArray;
}


function getAllQuestionsFromAllSections(sectionsArray){
    let allQuestionsArray = [];
    for(let a = 0; a<sectionsArray.length; a++){
        let questionsArray = sectionsArray[a].Questions;
        allQuestionsArray = allQuestionsArray.concat(questionsArray);
    }

    return allQuestionsArray;
}

function getAnsweredQuestions(allQuestionsArray){
    let allAnsweredQuestionsArray = allQuestionsArray.filter((question)=>{
        if(question.Answered === true){
            return question;
        }
    });

    return allAnsweredQuestionsArray;
}

function getAllChoicesFromAllQuestions(allQuestionsArray){
    let allChoicesFromAllQuestionsArray = [];
    for(let a = 0; a < allQuestionsArray.length ; a++){
        let question = allQuestionsArray[a];

        for(let b = 0; b< question.Choices.length; b++){
            question.Choices[b].ParentQuestionCategoryObj = question.CategorySubcategory.CategoryObj;
            question.Choices[b].ActiveCategoryObj = (question.Choices[b].CategoryObj.Name === 'All Characters') ? question.CategorySubcategory.CategoryObj : question.Choices[b].CategoryObj;
            allChoicesFromAllQuestionsArray.push(question.Choices[b]);
        }         
    }

    return allChoicesFromAllQuestionsArray;
}

function getSelectedChoicesInQuestions(questionsArray){
    let allSelectedChoicesObjArray = [];
    for(let i = 0; i < questionsArray.length; i++){
        let question = questionsArray[i];
        let selectedChoice = question.Choices.find((choice)=>{
            if(choice.Selected === true){
                return choice;
            }           
        });

        if(selectedChoice != undefined){
            selectedChoice.ParentQuestionCategoryObj = question.CategorySubcategory.CategoryObj;
            selectedChoice.ActiveCategoryObj = (selectedChoice.CategoryObj.Name === 'All Characters') ? question.CategorySubcategory.CategoryObj : selectedChoice.CategoryObj;
            allSelectedChoicesObjArray.push(selectedChoice);
        }
    }
    return allSelectedChoicesObjArray;
}

function getAllCategoriesWithAssignedChoices(categoriesArray, choicesArray){

    let allCategoriesWithChoices = JSON.parse(JSON.stringify(categoriesArray));    
    for(let a = 0; a < allCategoriesWithChoices.length; a++){
        let categoryObj = allCategoriesWithChoices[a];
        categoryObj.ObtainedPoints = 0;
        let selectedChoicesArray = choicesArray.filter((choice)=>{         
            if(choice.ActiveCategoryObj.CategoryId === categoryObj.CategoryId.value){
                categoryObj.ObtainedPoints += choice.ChoiceObj.Value;
                return choice;
            }
        });

        allCategoriesWithChoices[a].AllChoicesInCategory = selectedChoicesArray;
    }
    
    return allCategoriesWithChoices;
}

function createAssessmentResultReport(categoriesWithInitialChoices, categoriesWithSelectedChoices){
    
    let categoriesWithInitialChoicesArray = JSON.parse(JSON.stringify(categoriesWithInitialChoices));
    let categoriesWithSelectedChoicesArray = JSON.parse(JSON.stringify(categoriesWithSelectedChoices));
    for(let a = 0; a < categoriesWithSelectedChoicesArray.length; a++){
        let selectedCategory = categoriesWithInitialChoicesArray.find((category)=>{
            if(category.CategoryId.value === categoriesWithSelectedChoicesArray[a].CategoryId.value){
                return category;
            }
        });

        if(selectedCategory !== undefined){
            categoriesWithSelectedChoicesArray[a].TotalCategoryPoints = selectedCategory.ObtainedPoints;
        }
    }
    return categoriesWithSelectedChoicesArray;
}

// function getAllCategoriesWithAssignedChoices0(categoriesArray, choicesArray){

//     let allCategoriesWithChoices = JSON.parse(JSON.stringify(categoriesArray));    
//     for(let a = 0; a < allCategoriesWithChoices.length; a++){
//         let selectedChoicesArray = choicesArray.filter((choice)=>{
//             let categoryObj = allCategoriesWithChoices[a];

//             if(choice.CategoryObj.Name === "All Characters" ){
//                 if(choice.ParentQuestionCategoryObj.CategoryId === categoryObj.CategoryId.value){
//                     return choice.ActiveCategory = choice.ParentQuestionCategoryObj;
//                 }
//             }
//             else if(choice.CategoryObj.CategoryId === categoryObj.CategoryId.value){
//                 return choice.ActiveCategory = choice.CategoryObj;
//             }
//         });

//         allCategoriesWithChoices[a].AllChoicesInCategory = selectedChoicesArray;
//     }
    
//     return allCategoriesWithChoices;
// }


//#ENDREGION Private Functions