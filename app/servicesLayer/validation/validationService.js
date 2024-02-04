const objectModelInspector = require('./objectModelInspector.js');


//Test: DONE
const resolveUserModelValidation = function(userModel){
    let reportInputLength = objectModelInspector.inspectInputLength(userModel);
    let reportInputType = objectModelInspector.inspectInputType(userModel);
    let reportInputValue = objectModelInspector.inspectInputValue(userModel);

    let errorsReport = Object.assign({},reportInputType,reportInputLength,reportInputValue);
    return errorsReport;
}


const validationService = Object.freeze({
    resolveUserModelValidation : resolveUserModelValidation
});

module.exports = validationService;

//#REGION Private Functions

//#ENDREGION Private Functions
