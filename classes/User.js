// require knex
const knex = require('../databases/knex');
// require bcryptjs
const bcryptjs = require('bcryptjs');

// create class User for all User operations
class User {

    /**
     * get all User data 
     * @param {limit Int,skip Int} query 
     */
    static async getUsers(query) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get form  query params limit and skip
            const limit = query.limit || 10;
            const skip = query.skip || 10;

            // get all data Users and use limit and skip for pagenate it
            const  data = await knex.select()
                                    .from('users')
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
     * get One User data
     * @param {id Int} UserId 
     */
    static async getOneUser(UserId) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get one User data 
            const  data = await knex.select()
                                    .from('users')
                                    .where('id' , UserId);
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
     * create User
     * @param {
     *  firstName String,
     *  lastName String,
     *  username String,
     *  email String,
     *  password String
     * } body 
     */
    static async registerUser(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // encrecpt password
            const encryptPassword = bcryptjs.hash(body.password, 12);
        
            // reasgin password or put it into body request
            body.password = encryptPassword;

            // insert data new User in Users table
            const newUser = await knex('users').insert(body);
            // check if complete 
            if (newUser){
                // change status to 201 created and return data User 
                statusCode = 201;
                response.data = newUser;
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
     * update User data
     * @param {id Int} UserId 
     * @param {
     *  firstName String,
     *  lastName String,
     *  username String,
     *  email String,
     *  password String
     * } body 
     */
    static async updateUser(UserId, body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // get data User in Users table
            const User = await knex.select()
                                    .from('users')
                                    .where('id', UserId);
            // check if complete 
            if (!User){
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = 'User is not found';
            } else {
                // check if any User have the same username of updated data
                const userNameExist = await knex.select()
                                    .from('users')
                                    .whereNot('id', UserId)
                                    .where('username', body.username);

                const emailExist = await knex.select()
                                    .from('users')
                                    .whereNot('id', UserId)
                                    .where('email', body.email);
                
                // check if exist data or not
                if (userNameExist ||  emailExist) {
                    // change status to 409 conflect and return message error 
                    statusCode = 409;
                    response.message = 'there are error in data you put it';
                } else {
                    // encrecpt password if it come from body
                    const encryptPassword = body.password ?
                        bcryptjs.hash(body.password, 12) : User.password;
                    
                    // reasgin password or put it into body request
                    body.password = encryptPassword;

                    // update Users data
                    await knex('Users')
                        .update(body)
                        .where('id', UserId);

                    // return status code and response message
                    statusCode = 200;
                    response.message =  'updated';
                }
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
     * active User
     * @param {id Int} UserId 
     * @param {
     *  status Boolean,
     *  idUsers Array
     * } body 
     */
    static async activeUser(adminId, body){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { status, idUsers } = body;
                idUsers.forEach( async (user, index) => {
                    // get data User in Users table
                    const userData = await knex.select()
                                        .from('Users')
                                        .where('id', user[index])
                                        .first();
                    // check if complete 
                    if (!userData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'User is not found';
                        resolve({ statusCode, response });
                    } else {

                        // update Users status data AND  who active this User
                    
                        await knex('Users')
                        .update({status, admin_id: adminId})
                        .where('id', user[index]);
                    

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
     * delete User data
     * @param { idUsers Array} body 
     */
    static async deleteUser(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { idUsers } = body;
                // loop of idUsers
                await idUsers.forEach( async (user, index) => {
                    // get data User in Users table
                    const UsersData = await knex.select()
                                    .from('Users')
                                    .where('id', user[index])
                                    .first();
                    // check if complete 
                    if (!UsersData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'Users is not found';
                        // return resolve data from Promise
                        resolve({statusCode, response});
                    } else {

                        // update Users status data AND  who active this User
                        await knex('users')
                        .where('id', user[index]).del();
                 

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

module.exports = User;