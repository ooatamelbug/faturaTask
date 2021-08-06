// require class User
const User = require('../classes/User');

// export getUsers function 
exports.getUsers = async (req, res) => {
    // pass request query to getUsers function from class User
    const result = await User.getUsers(req.query);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export getOneUser function 
exports.getOneUser = async (req, res) => {
    // pass request params to getOneUser function from class User
    const result = await User.getOneUser(req.params.id);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export registerUser function 
exports.registerUser = async (req, res) => {
    // pass request body to registerUser function from class User
    const result = await User.registerUser(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export updateUser function 
exports.updateUser = async (req, res) => {
    // pass request params and body to updateUser function from class User
    const result = await User.updateUser(req.params.userid, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export activeUser function 
exports.activeUser = async (req, res) => {
    // pass request query to activeUser function from class User
    const result = await User.activeUser(req.user.id, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export deleteUser function 
exports.deleteUser = async (req, res) => {
    // pass request query to deleteUser function from class User
    const result = await User.deleteUser(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}