
const sessionViewModel = require('../../presentationLayer/viewModels/sessionViewModel.js');
const viewModelEnumeration = require('../../servicesLayer/enumerations/viewModel.js');



const createViewModel = function(viewModelEnum , objModel ){
    let model = null;

    switch(viewModelEnum){
       
        case viewModelEnumeration.SessionViewModel_MappedFromSessionDtoModel:
            model = createSessionViewModelMappedFromSessionDtoModel(objModel);
        break;

    }

    return model;
}



const sessionViewModelFactory = Object.freeze({
    createViewModel : createViewModel
});

module.exports = sessionViewModelFactory;


//#REGION Private Functions 
//Test: DONE

const createSessionViewModelMappedFromSessionDtoModel = function (sessionDtoModel) {
    let currentSessionViewModel = new sessionViewModel();
    currentSessionViewModel.userId.fieldValue = sessionDtoModel.UserId.value;
    currentSessionViewModel.sessionToken.fieldValue = sessionDtoModel.SessionToken.value;
    currentSessionViewModel.expires.fieldValue = sessionDtoModel.Expires.value;
    currentSessionViewModel.data.fieldValue = sessionDtoModel.Data.value;
    currentSessionViewModel.isActive.fieldValue = sessionDtoModel.IsActive.value;
    currentSessionViewModel.utcDateCreated.fieldValue = sessionDtoModel.UTCDateCreated.value.toString();
    currentSessionViewModel.utcDateExpired.fieldValue = sessionDtoModel.UTCDateExpired.value.toString();
    return currentSessionViewModel;
}

//#ENDREGION Private Functions 