// require express route
const route = require('express').Router();
// require user controller 
const controller = require('../controllers/userController');
// require middleware 

// route of get Users
route.get('/', [], controller.getUsers);

// route of get one Users
route.get('/:id', [], controller.getOneUser);

// route of create Users
route.post('/', [], controller.registerUser);

// route of update Users
route.put('/update/:userid', [], controller.updateUser);

// route of active Users
route.put('/active', [], controller.activeUser);

// route of delete Users
route.delete('/delete', [], controller.deleteUser);

// exports route 
module.exports = route;