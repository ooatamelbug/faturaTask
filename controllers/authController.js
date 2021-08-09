// require class Admin
const AuthLogin = require('../classes/AuthLogin');

// export getAdmins function 
exports.loginUser = async (req, res) => {
    // pass request query to loginUser function from class AuthLogin
    const result = await AuthLogin.loginUser(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export loginAdmin function 
exports.loginAdmin = async (req, res) => {
    // pass request params to loginAdmin function from class AuthLogin
    const result = await AuthLogin.loginAdmin(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export logoutUser function 
exports.logoutUser = async (req, res) => {
    // pass request user and body to logoutUser function from class AuthLogin
    const result = await AuthLogin.logoutUser(req.user.id, req.token);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export logoutAdmin function 
exports.logoutAdmin = async (req, res) => {
    // pass request user and body to logoutAdmin function from class AuthLogin
    const result = await AuthLogin.logoutAdmin(req.user.id, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}
