// require express route
const route = require('express').Router();
// require Permission controller 
const controller = require('../controllers/permissionController');
// require middleware 
const { Jwt, Permission } = require('../middleware');

// route of get Permission
route.get('/', [
    Jwt,
    Permission('permissions:read')
], controller.getPermissions);

// route of get admin Permission
route.get('/:adminId', [
    Jwt,
    Permission('permissions:read')
], controller.getPermissionAdmin);

// route of create Permission
route.post('/', [
    Jwt,
    Permission('permissions:create')
], controller.createPermission);

// route of create Permission for admin
route.post('/admin/:adminId', [
    Jwt,
    Permission('permissions:give')
], controller.createPermissionAdmin);

// route of update Permission
route.put('/update/:permissionId', [
    Jwt,
    Permission('permissions:update')
], controller.updatePermission);

// route of update Permission for admin
route.put('/update/admin/:adminId', [
    Jwt,
    Permission('permissions:give')
], controller.updatePermissionAdmin);

// route of delete Permission
route.put('/delete', [
    Jwt,
    Permission('permissions:delete')
], controller.deletePermission);

// route of delete Permission for admin
route.delete('/delete/admin/:adminId', [
    Jwt,
    Permission('permissions:del')
], controller.deletePermissionAdmin);

// exports route 
module.exports = route;