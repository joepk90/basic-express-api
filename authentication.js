function authenticate(req, res, next) {

    console.log('Authenticating...');

    // terminate request response cycle. move to next middleware function
    next();
};

module.exports = authenticate;