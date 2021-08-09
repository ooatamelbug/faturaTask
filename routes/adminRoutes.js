// require express route
const route = require('express').Router();
// require admin controller 
const controller = require('../controllers/adminController');
// require middleware 
const { Jwt, Permission } = require('../middleware');

route.get('/', [
    Jwt,
    Permission('admins:read')
], controller.getAdmins);

// route of get one Admins
route.get('/:id', [
    Jwt,
    Permission('admins:read')
], controller.getOneAdmin);

// route of create Admins
route.post('/', [
    Jwt,
    Permission('admins:create')
], controller.createAdmin);

// route of update Admins
route.put('/update/:adminId', [
    Jwt,
    Permission('admins:update')
], controller.updateAdmin);

// route of active Admins
route.put('/active', [
    Jwt,
    Permission('admins:active')
], controller.activeAdmin);

// route of delete Admins
route.delete('/delete', [
    Jwt,
    Permission('admins:delete')
], controller.deleteAdmin);

// exports route 
module.exports = route;