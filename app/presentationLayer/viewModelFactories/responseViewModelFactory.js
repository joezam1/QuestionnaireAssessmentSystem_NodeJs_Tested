const viewModel = require('../../servicesLayer/enumerations/viewModel');
const responseViewModel = require('../../presentationLayer/viewModels/responseViewModel.js');


const createViewModel = function(viewModelEnum , objModel ){
    let model = null;

    switch(viewModelEnum){
       
        //ResponseViewModelArray_MappedFromResponseStatement
        case viewModel.ResponseViewModelArray_MappedFromResponseStatement:
            model = createResponseViewModelArrayMappedFromResponseStatement(objModel.ResponseStatementId, objModel.UserId, objModel.Sections);
        break;

    }

    return model;
}



const responseViewModelFactory = Object.freeze({
    createViewModel : createViewModel
});

module.exports = responseViewModelFactory;


//#REGION Private Functions 

function createResponseViewModelArrayMappedFromResponseStatement(responseStatementId, userId , sectionsArray){

    let _responseViewModelArray = [];
    for(let a = 0; a < sectionsArray.length; a++){
        for(let b = 0; b< sectionsArray[a].Questions.length; b++){

            const question = sectionsArray[a].Questions[b];
            let selectedChoice = sectionsArray[a].Questions[b].Choices.find((choice)=>{
                return (choice.Selected === true);
            });
            if(selectedChoice !== undefined){
            
                let activeCategoryId = (selectedChoice.CategoryObj.Name === 'All Characters') ? question.CategorySubcategory.CategoryObj.CategoryId : selectedChoice.CategoryObj.CategoryId;
                let model = {
                    QuestionNumber: sectionsArray[a].Questions[b].QuestionNumber,
                    Index: sectionsArray[a].Questions[b].Index,
                    ResponseStatementId: responseStatementId,
                    UserId : userId,
                    QuestionChoiceId: selectedChoice.QuestionChoiceId,
                    QuestionId: sectionsArray[a].Questions[b].QuestionId,
                    ChoiceId: selectedChoice.ChoiceObj.ChoiceId, 
                    CategoryId: activeCategoryId,
                    QuestionText: sectionsArray[a].Questions[b].Text,
                    ChoiceText:selectedChoice.ChoiceObj.Name , 
                    ChoiceValue: selectedChoice.ChoiceObj.Value,
                }

                let _responseViewModel = new responseViewModel(model);
                _responseViewModelArray.push(_responseViewModel);
            }
        }
    }

    return _responseViewModelArray;
}


//#ENDREGION Private Functions 