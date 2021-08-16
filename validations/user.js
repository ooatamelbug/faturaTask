const username, password, email, firstName, lastName;
const { Promise } = require('bluebird');
const knex = require('../databases/knex');

const userRegister = async (properties) => {
    properties('username')
        .trim().escape()
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
    properties('email')
        .trim().escape()
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
    properties('firstName')
        .trim().escape()
        .isAlpha().withMessage('you should contain string')
        .isLength({min:3}).withMessage('min Length is 6 char'),
        
    properties('lastName')
        .trim().escape()
        .isAlpha().withMessage('you should contain string')
        .isLength({min:3}).withMessage('min Length is 6 char'),
    properties('password')
        .trim().escape()
        .isAlphanumeric().withMessage('you should contain number and string')
        .isLength({min:8}).withMessage('min Length is 6 char')
};




module.exports = {
    userRegister   
};