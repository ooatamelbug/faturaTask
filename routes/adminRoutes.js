// require express route
const route = require('express').Router();
// require admin controller 
const controller = require('../controllers/adminController');
// require middleware 

// route of get Admins
route.get('/', [], controller.getAdmins);

// route of get one Admins
route.get('/:id', [], controller.getOneAdmin);

// route of create Admins
route.post('/', [], controller.createAdmin);

// route of update Admins
route.put('/update/:adminId', [], controller.updateAdmin);

// route of active Admins
route.put('/active', [], controller.activeAdmin);

// route of delete Admins
route.delete('/delete', [], controller.deleteAdmin);

// exports route 
module.exports = route;