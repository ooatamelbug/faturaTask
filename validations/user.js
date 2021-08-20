// require knex DB 
const knex = require('../databases/knex');
// require param body from  express validator
const { body, param } = require('express-validator');

// validations user data Register
const userRegister = [ 
    body('username')
        .trim().escape()
        .notEmpty().withMessage('username not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isLength({min:6}).withMessage('min Length is 6 char'),
    body('email')
        .trim().escape()
        .notEmpty().withMessage('email not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isEmail().withMessage(' not format email')
        .isLength({min:6}).withMessage('min Length is 6 char'),
    body('firstName')
        .trim().escape()
        .notEmpty().withMessage('firstName not Empty')
        .isAlpha().withMessage('you should contain string')
        .isLength({min:3}).withMessage('min Length is 3 char'),
    
    body('lastName')
        .trim().escape()
        .notEmpty().withMessage('lastName not Empty')
        .isAlpha().withMessage('you should contain string')
        .isLength({min:3}).withMessage('min Length is 8 char'),
    body('password')
        .trim().escape()
        .notEmpty().withMessage('password not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isLength({min:8}).withMessage('min Length is 8 char')
];

// validations user data update
const userUpdate = [ 
    body('username')
        .trim().escape()
        .notEmpty().withMessage('username not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isLength({min:6}).withMessage('min Length is 6 char')
        .custom(async (value ,{req}) => {
            const existUserName = await knex.select('username')
                                        .from('users')
                                        .where('username', value)
                                        .first();
            if(existUserName){
                return Promise.reject('username is already exist');
            }
        }),
    body('email')
        .trim().escape()
        .notEmpty().withMessage('email not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isEmail().withMessage(' not format email')
        .isLength({min:6}).withMessage('min Length is 6 char')
        .custom(async (value ,{req}) => {
            const existEmail = await knex.select('email')
                                        .from('users')
                                        .where('email', value)
                                        .first();
            if(existEmail){
                return Promise.reject('email is already exist');
            }
        }),
    body('firstName')
        .trim().escape()
        .notEmpty().withMessage('firstName not Empty')
        .isAlpha().withMessage('you should contain string')
        .isLength({min:3}).withMessage('min Length is 3 char'),

    body('lastName')
        .trim().escape()
        .notEmpty().withMessage('lastName not Empty')
        .isAlpha().withMessage('you should contain string')
        .isLength({min:3}).withMessage('min Length is 3 char'),
    body('password')
        .trim().escape()
        .notEmpty().withMessage('password not Empty')
        .isAlphanumeric().withMessage('you should contain number and string')
        .isLength({min:8}).withMessage('min Length is 8 char')
    ];

// validations user id param
const userId = [
    param('id')
        .trim().escape()
        .notEmpty().withMessage('id param not Empty')
        .isNumeric().withMessage('not Numer')
];


module.exports = {
    userRegister,
    userUpdate ,
    userId
};