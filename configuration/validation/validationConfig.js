const passwordMinCharacters = 3;
const passwordSaltRounds = 8;


const validationConfig = Object.freeze({
    passwordMinCharacters:passwordMinCharacters,
    passwordSaltRounds:passwordSaltRounds
});

module.exports = validationConfig;