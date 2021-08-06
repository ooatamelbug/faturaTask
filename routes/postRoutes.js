// require express route
const route = require('express').Router();
// require Posts controller 
const controller = require('../controllers/postController');
// require middleware 

// route of get Posts
route.get('/', [], controller.getPosts);

// route of get one Posts
route.get('/:id', [], controller.getOnePost);

// route of create Posts
route.post('/', [], controller.createPost);

// route of update Posts
route.put('/update/:postId', [], controller.updatePost);

// route of active Posts
route.put('/active', [], controller.activePost);

// route of delete Posts
route.delete('/delete', [], controller.deletePost);

// exports route 
module.exports = route;