// require express route
const route = require('express').Router();
// require Posts controller 
const controller = require('../controllers/postController');
// require middleware 
const { Jwt, Permission } = require('../middleware');

// route of get Posts
route.get('/', [
    Jwt
], controller.getPosts);

// route of get one Posts
route.get('/:id', [
    Jwt
], controller.getOnePost);

// route of create Posts
route.post('/', [
    Jwt
], controller.createPost);

// route of update Posts
route.put('/update/:postId', [
    Jwt
], controller.updatePost);

// route of active Posts
route.put('/active', [
    Jwt,
    Permission('posts:active')
], controller.activePost);

// route of delete Posts
route.delete('/delete', [Jwt], controller.deletePost);

// exports route 
module.exports = route;