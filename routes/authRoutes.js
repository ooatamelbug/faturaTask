// require express route
const route = require('express').Router();
// require admin controller 
const controller = require('../controllers/authController');
// require middleware 

// route of log in user
route.post('/user/in', [], controller.loginUser);

// route of log in Admins
route.post('/admin/in', [], controller.loginAdmin);

// route of log out user
route.post('/user/out', [], controller.logoutUser);

// route of log out Admins
route.post('/admin/out', [], controller.logoutAdmin);

// exports route 
module.exports = route;