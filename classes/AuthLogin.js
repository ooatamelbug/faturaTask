// require knex file 
const knex = require('../knexfile');
const knexInvironment = require('knex')[knex.development];
// require jwt 
const jwt = require('jsonwebtoken');
// require bcryptjs 
const bcryptjs = require('bcryptjs');
// require config 
const config = require('config');
// require moment 
const moment = require('moment');

class Auth {
    /**
     * 
     * @param {*} body 
     */
    static async loginUser(body){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get some data from body
            const { username, email, password } = body;
            // create viriable empty 
            let user;
            let col;
            // check if request body have or contain one username or email 
            if(username && !email) {
                // get data of user by username
                const userData = knex.select().from('users').where('username', username).first();
                // append userData to user viriable
                user = userData;
                // append to col viriable what column have get data on it
                col = 'username';
            } else {
                // get data of user by email
                const userData = knex.select().from('users').where('email', email).first();
                // append userData to user viriable
                user = userData;
                // append to col viriable what column have get data on it
                col = 'email';
            }
            // check if user is empty or not 
            if (!user) {
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = `no data for this user please check true ${col}`;
            }
            // verify Password and compare two password from user and request
            const verifyPassword = bcryptjs.compare(password, user.password);
            // check if is two password is matched 
            if(!verifyPassword){
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = `password is not correct please check true`;     
            }else {
                // create token wirh data of user and secret
                const token = jwt.sign(user,
                    config.get('jwt.secret'),
                    {
                        expiresIn: config.get('jwt.expiresin')
                    });
                
                // change formate date time and clac expirin time
                let logintime = moment(new Date()).utc().format();
                let expirin = moment(new Date()).add(config.get('jwt.expiresin'),'hours');
                expirin.utc().format();
                // insert data login in authlogin 
                const logauth = await knex('authlogin').insert({
                    'tablename': 'users',
                    'token': token,
                    'expirin': expirin,
                    'logintime': logintime,
                    'logouttime': NULL,
                    'user_id': user.id,
                    'admin_id': NULL,
                    'status': true
                });

                // return status code and response message
                statusCode = 200;
                delete user.password;
                response.data = { user:  user, token: token };
            }
        }catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return {statusCode, response};
    }

    /**
     * 
     * @param {*} body 
     */
    static async loginAdmin(body){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get some data from body
            const { username, password } = body;
            // create viriable empty 
            let admin;
            // check if request body have or contain one username or email 
            if(username) {
                // get data of user by username
                const userData = knex.select()
                                    .from('admins')
                                    .where('username', username)
                                    .first();
                // append userData to user viriable
                admin = userData;
            }
            // check if user is empty or not 
            if (!user) {
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = `no data for this user please check true username`;
            }
            // verify Password and compare two password from user and request
            const verifyPassword = bcryptjs.compare(password, user.password);
            // check if is two password is matched 
            if(!verifyPassword){
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = `password is not correct please check true`;     
            }else {
                // create token wirh data of user and secret
                const token = jwt.sign(admin,
                    config.get('jwt.secret'),
                    {
                        expiresIn: config.get('jwt.expiresin')
                    });
                
                // change formate date time and clac expirin time
                let logtime = knexInvironment.fn.now();
                // or 
                let logtimed = new Date().toISOString();
                // or
                let logintime = moment(new Date()).utc().format();
                let expirin = moment(new Date()).add(config.get('jwt.expiresin'),'hours');
                expirin.utc().format();
                console.log(logtime);
                console.log(logtimed);
                console.log(logintime);
                console.log(expirin);
                // insert data login in authlogin 
                // const logauth = await knex('authlogin').insert({
                //     'tablename': 'admins',
                //     'token': token,
                //     'expirin': expirin,
                //     'logintime': logintime,
                //     'logouttime': NULL,
                //     'user_id': NULL,
                //     'admin_id': admin.id,
                //     'status': true
                // });

                // return status code and response message
                statusCode = 200;
                delete user.password;
                response.data = { user:  user, token: token };
            }
        }catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return {statusCode, response};
    }

    /**
     * 
     * @param {*} userId 
     * @param {*} token 
     */
    static async logoutUser(userId, {token}){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get data of data by userId and token from authlogin
            const userData = knex.select()
                .from('authlogin')
                .where('tablename', 'users')
                .where('user_id', userId)
                .where('token', token)
                .where('status',true)
                .first();
            // check if user is empty or not 
            if (!userData) {
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = `no data for this user please check true token`;
            } else {
                // change formate date time and clac expirin time
                let logouttime = moment(new Date()).utc().format();
                // insert data login in authlogin 
                const logauth = await knex('authlogin')
                    .where('user_id', userId)
                    .where('token', token)
                    .update({
                        'logouttime': logouttime,
                        'status': false
                    });

                // return status code and response message
                statusCode = 200;
                response.message = 'logout';
            }
        }catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return {statusCode, response};
    }
    
    /**
     * 
     * @param {*} adminId 
     * @param {*} token 
     */
    static async logoutAdmin(adminId, token){
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get data of data by adminId and token from authlogin
            const userData = knex.select()
                .from('authlogin')
                .where('tablename', 'admins')
                .where('admin_id', adminId)
                .where('token', token)
                .where('status',true)
                .first();
            // check if user is empty or not 
            if (!userData) {
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = `no data for this user please check true token`;
            } else {
                // change formate date time and clac expirin time
                let logouttime = moment(new Date()).utc().format();
                // insert data login in authlogin 
                const logauth = await knex('authlogin')
                    .where('admin_id', adminId)
                    .where('token', token)
                    .update({
                        'logouttime': logouttime,
                        'status': false
                    });

                // return status code and response message
                statusCode = 200;
                response.message = 'logout';
            }
        }catch (error) {
            // change status code to 500 server error and put message
            statusCode = 500;
            response.message = 'error in data';
        }
        // return status code and response data
        return {statusCode, response};
    }
}

module.exports = Auth;