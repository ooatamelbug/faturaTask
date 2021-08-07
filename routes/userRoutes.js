// require express route
const route = require('express').Router();
// require user controller 
const controller = require('../controllers/userController');
// require middleware 
const { Jwt, Permission } = require('../middleware');

// route of get Users
route.get('/', [
    Jwt,
    Permission('users:read')
], controller.getUsers);

// route of get one Users
route.get('/:id', [
    Jwt,
    Permission('users:read')
], controller.getOneUser);

// route of create Users
route.post('/', [
    Jwt
], controller.registerUser);

// route of update Users
route.put('/update/:userid', [
    Jwt
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