// require knex
const knex = require('../databases/knex');
// require bcryptjs
const bcryptjs = require('bcryptjs');

// create class Admin for all admin operations
class Admin {

    /**
     * get all admin data 
     * @param {limit Int,skip Int} query 
     */
    static async getAdmins(query) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get form  query params limit and skip
            const limit = query.limit || 10;
            const skip = query.skip || 10;

            // get all data admins and use limit and skip for pagenate it
            const  data = await knex.select()
                                    .from('admins')
                                    .limit(limit)
                                    .offset(skip);
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
     * get One Admin data
     * @param {id Int} adminId 
     */
    static async getOneAdmin(adminId) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get one admin data 
            const  data = await knex.select()
                                    .from('admins')
                                    .where('id' , adminId);
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
     * create Admin
     * @param {
     *  firstName String,
     *  lastName String,
     *  username String,
     *  password String
     * } body 
     */
    static async createAdmin(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // encrecpt password
            const encryptPassword = bcryptjs.hash(body.password, 12);
        
            // reasgin password or put it into body request
            body.password = encryptPassword;

            // insert data new admin in admins table
            const newAdmin = await knex('admins').insert(body);
            // check if complete 
            if (newAdmin){
                // change status to 201 created and return data admin 
                statusCode = 201;
                response.data = newAdmin;
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
     * update Admin data
     * @param {id Int} adminId 
     * @param {
     *  firstName String,
     *  lastName String,
     *  username String,
     *  password String
     * } body 
     */
    static async updateAdmin(adminId, body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // get data admin in admins table
            const admin = await knex.select()
                                    .from('admins')
                                    .where('id', adminId);
            // check if complete 
            if (!admin){
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = 'admin is not found';
            } else {
                // check if any admin have the same username of updated data
                const adminUserName = await knex.select()
                                    .from('admins')
                                    .whereNot('id', adminId)
                                    .where('username', body.username);

                // check if exist data or not
                if (adminUserName) {
                    // change status to 409 conflect and return message error 
                    statusCode = 409;
                    response.message = 'there are error in data you put it';
                } else {
                    // encrecpt password if it come from body
                    const encryptPassword = body.password ?
                        bcryptjs.hash(body.password, 12) : admin.password;
                    
                    // reasgin password or put it into body request
                    body.password = encryptPassword;

                    // update admins data
                    await knex('admins')
                        .update(body)
                        .where('id', adminId);

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
     * active Admin
     * @param {id Int} adminId 
     * @param {
     *  status Boolean,
     *  idAdmins Array
     * } body 
     */
    static async activeAdmin(adminId, body){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { status, idAdmins } = body;

                idAdmins.forEach( async (admin, index) => {

                    // get data admin in admins table
                    const adminsData = await knex.select()
                                        .from('admins')
                                        .where('id', admin[index])
                                        .first();
                    // check if complete 
                    if (!adminsData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'admin is not found';
                        resolve({ statusCode, response });
                    } else {

                        // update admins status data AND  who active this admin
                        await knex('admins')
                            .update({status, admin_id: adminId})
                            .where('id', admin[index]);
                    

                        // return status code and response message
                        statusCode = 200;
                        response.message =  'status changed';
                        resolve({ statusCode, response });
                    }
                });

            } catch (error) {
                // change status code to 500 server error and put message
                statusCode = 500;
                response.message = 'error in data';
                resolve({ statusCode, response });
            }
        })
    }
    
    /**
     * delete Admin data
     * @param { idAdmins Array} body 
     */
    static async deleteAdmin(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { idAdmins } = body;
                // loop of idAdmins
                await idAdmins.forEach( async (admin, index) => {
                    // get data admin in admins table
                    const adminsData = await knex.select()
                                    .from('admins')
                                    .where('id', admin[index])
                                    .first();
                    // check if complete 
                    if (!adminsData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'admins is not found';
                        // return resolve data from Promise
                        resolve({statusCode, response});
                    } else {

                        // update admins status data AND  who active this admin
                        await knex('admins')
                        .where('id', admin[index]).del();
                 

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

module.exports = Admin;