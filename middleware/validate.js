// require validationResult
const { validationResult } = require('express-validator');

// validate request
const Validate = async (req, res, next) => {
    // get errors from validationResult 
    const { errors } = await validationResult(req);
    // check if errors is not Empty
    if(errors.length > 0){
        // send status code and errors Data
        res.status(400).json({
            'message': 'error in input',
            data :errors
        })
    }
    next();
}

module.exports = Validate;
