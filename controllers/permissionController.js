// require class Permission
const Permission = require('../classes/Permission');

// export getPermissions function 
exports.getPermissions = async (req, res) => {
    // pass request query to getPermissions function from class Permission
    const result = await Permission.getPermissions(req.query);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export getPermissionAdmin function 
exports.getPermissionAdmin = async (req, res) => {
    // pass request params to getPermissionAdmin function from class Permission
    const result = await Permission.getPermissionAdmin(req.params.adminId);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export createPermission function 
exports.createPermission = async (req, res) => {
    // pass request body to createPermission function from class Permission
    const result = await Permission.createPermission(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}


// export createPermissionAdmin function 
exports.createPermissionAdmin = async (req, res) => {
    // pass request params and body to createPermissionAdmin function from class Permission
    const result = await Permission.createPermissionAdmin(req.params.adminId,req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export updatePermission function 
exports.updatePermission = async (req, res) => {
    // pass request params and body to updatePermission function from class Permission
    const result = await Permission.updatePermission(req.params.permissionId, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export updatePermissionAdmin function 
exports.updatePermissionAdmin = async (req, res) => {
    // pass request params and body to updatePermissionAdmin function from class Permission
    const result = await Permission.updatePermissionAdmin(req.params.adminId, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export deletePermissionAdmin function 
exports.deletePermissionAdmin = async (req, res) => {
    // pass request query to deletePermissionAdmin function from class Permission
    const result = await deletePermission.deletePermissionAdmin(req.params.adminId, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export deletePermission function 
exports.deletePermission = async (req, res) => {
    // pass request query to deletePermission function from class Permission
    const result = await Permission.deletePermission(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}