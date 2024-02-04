const bcrypt = require('bcrypt');
const validationConfig = require('../../../configuration/validation/validationConfig.js');

//Test: DONE
const encryptStringInputAsync = async function(input){
    let encrypted = input;
    if(typeof input == 'string'){
        var saltRounds = validationConfig.passwordSaltRounds;
        encrypted = await bcrypt.hash(input, saltRounds);
    }
    return encrypted;
}
//Test:DONE
const validateEncryptedStringInputAsync = async function(plainTextInput, encryptedInput) {
    const comparison = await bcrypt.compare(plainTextInput, encryptedInput);
    return comparison;
}

const encryptionService = Object.freeze({
    encryptStringInputAsync : encryptStringInputAsync,
    validateEncryptedStringInputAsync : validateEncryptedStringInputAsync
});

module.exports = encryptionService;