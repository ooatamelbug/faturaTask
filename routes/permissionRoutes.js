// require express route
const route = require('express').Router();
// require Permission controller 
const controller = require('../controllers/permissionController');
// require middleware 

// route of get Permission
route.get('/', [], controller.getPermissions);

// route of get admin Permission
route.get('/:adminId', [], controller.getPermissionAdmin);

// route of create Permission
route.post('/', [], controller.createPermission);

// route of create Permission for admin
route.post('/admin/:adminId', [], controller.createPermissionAdmin);

// route of update Permission
route.put('/update/:permissionId', [], controller.updatePermission);

// route of update Permission for admin
route.put('/update/admin/:adminId', [], controller.updatePermissionAdmin);

// route of delete Permission
route.put('/delete', [], controller.deletePermission);

// route of delete Permission for admin
route.delete('/delete/admin/:adminId', [], controller.deletePermissionAdmin);

// exports route 
module.exports = route;