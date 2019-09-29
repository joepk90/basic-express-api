function log(req, res, next) {

    console.log('Logging...');

    // terminate request response cycle. move to next middleware function
    next();
};

module.exports = log;