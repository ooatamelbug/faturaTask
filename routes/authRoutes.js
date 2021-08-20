// require express route
const route = require('express').Router();
// require admin controller 
const controller = require('../controllers/authController');
// require middleware 
const { Jwt, Validate } = require('../middleware');
// require validations
const validateAuth = require('../validations/auth');

// route of log in user
route.post('/user/in', [
    validateAuth.userLogin,
    Validate
], controller.loginUser);

// route of log in Admins
route.post('/admin/in', [], controller.loginAdmin);

// route of log out user
route.post('/user/out', [Jwt], controller.logoutUser);

// route of log out Admins
route.post('/admin/out', [Jwt], controller.logoutAdmin);

// exports route 
module.exports = route;