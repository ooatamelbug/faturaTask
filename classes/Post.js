// require knex
const knex = require('../databases/knex');
// require bcryptjs
const bcryptjs = require('bcryptjs');

// create class Post for all Post operations
class Post {

    /**
     * get all Post data 
     * @param {limit Int,skip Int} query 
     */
    static async getPosts(query) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get form  query params limit and skip
            const limit = query.limit || 10;
            const skip = query.skip || 10;

            // get all data Posts and use limit and skip for pagenate it
            const  data = await knex.select()
                                    .from('posts')
                                    .limit(limit)
                                    .offset(skip);
            
            // change status code and send data in response of data 
            statusCode = 200;
            response.data = data;
        } catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return { statusCode, response };
    }

    /**
     * get One Post data
     * @param {id Int} PostId 
     */
    static async getOnePost(PostId) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get one Post data 
            const  data = await knex.select()
                                    .from('posts')
                                    .where('id' , PostId);
            // send data 
            statusCode = 200;
            response.data = data;
        } catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return { statusCode, response };
    }

    /**
     * create Post
     * @param {
     *  title String,
     *  body String,
     * } body 
     * @param { id int } userId
     */
    static async createPost(userId,body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // append user id to post body request  
            body.user_id = userId;

            // insert data new Post in Posts table
            const newPost = await knex('posts').insert(body);
            // check if complete 
            if (newPost){
                // change status to 201 created and return data Post 
                statusCode = 201;
                response.data = newPost;
            }
        } catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return { statusCode, response };
    }

    /**
     * update Post data
     * @param {id Int} PostId 
     *  title String,
     *  body String,
     * } body 
     * @param { id int } userId
     */
    static async updatePost(PostId, body, userId){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // get data Post in Posts table
            const Post = await knex.select()
                                    .from('posts')
                                    .where('id', PostId)
                                    .where('user_id', userId).first();
            // check if complete 
            if (!Post){
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = 'Post is not found or not for this user';
            } else {
            
                // update Posts data
                await knex('Posts')
                    .update(body)
                    .where('id', PostId);

                // return status code and response message
                statusCode = 200;
                response.message =  'updated';
            }
        } catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return { statusCode, response };
    }

    /**
     * active Post
     * @param {id Int} PostId 
     * @param {
     *  status Boolean,
     *  idPosts Array
     * } body 
     */
    static async activePost(adminId, body){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { status, idPosts } = body;
                idPosts.forEach( async (post, index) => {
                    // get data Post in Posts table
                    const userData = await knex.select()
                                        .from('Posts')
                                        .where('id', post[index])
                                        .first();
                    // check if complete 
                    if (!userData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'Post is not found';
                        resolve({ statusCode, response });
                    } else {

                        // update Posts status data AND  who active this Post
                    
                        await knex('Posts')
                        .update({status, admin_id: adminId})
                        .where('id', post[index]);
                    

                        // return status code and response message
                        statusCode = 200;
                        response.message =  'status changed';
                    }
                });
                resolve({ statusCode, response });
            } catch (error) {
                // change status code to 500 server error and put message
                statusCode = 500;
                response.message = 'error in data';
                resolve({ statusCode, response });
            }
        });
    }
    
    /**
     * delete Post data
     * @param { idPosts Array} body 
     */
    static async deletePost(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { idPosts } = body;
                // loop of idPosts
                await idPosts.forEach( async (post, index) => {
                    // get data Post in Posts table
                    const PostsData = await knex.select()
                                    .from('Posts')
                                    .where('id', post[index])
                                    .first();
                    // check if complete 
                    if (!PostsData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'Posts is not found';
                        // return resolve data from Promise
                        resolve({statusCode, response});
                    } else {

                        // update Posts status data AND  who active this Post
                        await knex('posts')
                        .where('id', post[index]).del();
                 

                        // return status code and response message
                        statusCode = 200;
                        response.message =  'status changed';
                    }
                });
                // return resolve data from Promise
                resolve({statusCode, response});
            } catch (error) {
                // change status code to 500 server error and put message
                statusCode = 500;
                response.message = 'error in data';
                // return resolve data from Promise
                resolve({statusCode, response});
            }
        });
    }
}

module.exports = Post;