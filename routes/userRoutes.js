// require express route
const route = require('express').Router();
// require user controller 
const controller = require('../controllers/userController');
// require middleware 
const { Jwt, Permission, Validate } = require('../middleware');
// require validations
const validateUser = require('../validations/user');

// route of get all Users
route.get('/', [
    Jwt,
    Permission('users:read')
], controller.getUsers);

// route of get one Users
route.get('/:id', [
    Jwt,
    Permission('users:read'),
    validateUser.userId,
    Validate 
] , controller.getOneUser);

// route of create Users
route.post('/register',[
    validateUser.userRegister,
    Validate
],controller.registerUser);

// route of update Users
route.put('/update/:userid', [
    Jwt,
    validateUser.userUpdate,
    validateUser.userId ,
    Validate
], controller.updateUser);

// route of active Users
route.put('/active', [
    Jwt,
    Permission('users:active')
], controller.activeUser);

// route of delete Users
route.delete('/delete', [
    Jwt,
    Permission('users:delete')
], controller.deleteUser);

// exports route 
module.exports = route;