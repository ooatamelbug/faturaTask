// require class Admin
const Post = require('../classes/Post');

// export getPosts function 
exports.getPosts = async (req, res) => {
    // pass request query to getPosts function from class Post
    const result = await Post.getPosts(req.query);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export getOnePost function 
exports.getOnePost = async (req, res) => {
    // pass request params to getOnePost function from class Post
    const result = await Post.getOnePost(req.params.id);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export createPost function 
exports.createPost = async (req, res) => {
    // pass request body and user id to createPost function from class Post
    const result = await Post.createPost(req.user.id,req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export updatePost function 
exports.updatePost = async (req, res) => {
    // pass request params and body and user id to updatePost function from class Post
    const result = await Post.updatePost(req.params.postId, req.body, req.user.id);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export activePost function 
exports.activePost = async (req, res) => {
    // pass request body and user admin id to activePost function from class Post
    const result = await Admin.activePost(req.user.id, req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}

// export deletePost function 
exports.deletePost = async (req, res) => {
    // pass request query to deletePost function from class Post
    const result = await Post.deletePost(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}