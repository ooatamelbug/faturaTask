// require class Admin
const Admin = require('../classes/Admin');

// export getAdmins function 
exports.getAdmins = async (req, res) => {
    // pass request query to getAdmins function from class Admin
    const result = await Admin.getAdmins(req.query);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export getOneAdmin function 
exports.getOneAdmin = async (req, res) => {
    // pass request params to getOneAdmin function from class Admin
    const result = await Admin.getOneAdmin(req.params.id);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export createAdmin function 
exports.createAdmin = async (req, res) => {
    // pass request body to createAdmin function from class Admin
    const result = await Admin.createAdmin(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export updateAdmin function 
exports.updateAdmin = async (req, res) => {
    // pass request params and body to updateAdmin function from class Admin
    const result = await Admin.updateAdmin(req.params.adminId, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export activeAdmin function 
exports.activeAdmin = async (req, res) => {
    // pass request query to activeAdmin function from class Admin
    const result = await Admin.activeAdmin(req.user.id, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export deleteAdmin function 
exports.deleteAdmin = async (req, res) => {
    // pass request query to deleteAdmin function from class Admin
    const result = await Admin.deleteAdmin(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}