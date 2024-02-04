const messageService = Object.freeze({
    corsErrorNotification: 'The CORS policy for this site does not '+
    'allow access from the specified Origin.',
    usernameOrEmailTaken : 'username or email already taken',
    registrationNotCompleted: 'Registration could not be completed.',
    usernameOrPasswordNotMatching: 'username or password do not match records.',
    sessionRemoved: 'Session has been removed.',
    sessionExpired: 'Session is expired.',
    sessionNoLongerActive: 'Session has been cleared and is no longer Active.',
    errorProcessingNewSession: 'There is an error Processing the new Session.',
    errorProcessingUserLogin: 'There is an error with the Login Process.',
    tokenRemoved: 'Token has been removed.',
    TokenNoLongerActive: 'Token has been cleared and is no longer Active.',
    errorProcessingNewToken: 'There is an error Processing the new Token.',
});

module.exports = messageService;