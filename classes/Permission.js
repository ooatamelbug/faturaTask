// require knex
const knex = require('../databases/knex');

// create class Permission for all Permission operations
class Permission {

    /**
     * get all Permission data 
     * @param {limit Int,skip Int} query 
     */
    static async getPermissions(query) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get form  query params limit and skip
            const limit = query.limit || 10;
            const skip = query.skip || 10;

            // get all data Permissions and use limit and skip for pagenate it
            const  data = await knex.select()
                                    .from('permissions')
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
     * get One Permission data
     * @param {id Int} adminId 
     */
    static async getPermissionAdmin(adminId) {
        // init stat for response 
        let response = {};
        let statusCode = 200;
        try {
            // get one Permission data 
            const  data = await knex.select()
                                    .from('adminpermissions')
                                    .where('admin_id' , adminId);
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
     * create Permission
     * @param {name String} body 
     */
    static async createPermission(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            body.name = body.name.replace(/ /g, ':');
            // insert data new permission in permissions table
            const newPost = await knex('permissions').insert(body);
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
     * create Permission for Admin
     * @param {
     *  permissions Arrray,
     * } body 
     * @param { id int } adminId
     */
    static async createPermissionAdmin(adminId,body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) =>  {
            try {
                // GET from body request permissions
                const { permissions } = body
                // access every permission in arrray permissions
                permissions.forEach(async (permission,index) => {
                    // insert data new Permission in Permissions table
                    const newPermission = await knex('adminpermissions').insert({
                        'permission_id': permission[index],
                        'admin_id': adminId
                    });
                    // check if complete 
                    if (!newPermission){
                        // change status to 409  and return data Permission 
                        statusCode = 409;
                        response.message = 'error';
                        resolve({statusCode ,response});
                    }
                })
                resolve({statusCode ,response});
                
            } catch (error) {
                // change status code to 500 server error and put message
                statusCode = 500;
                response.message = 'error in data';
                resolve({statusCode ,response});
            }
        })
    }

    /**
     * update Permission data
     * @param {id Int} PermissionId 
     * @param {
     *  name String,
     * } body 
     */
    static async updatePermission(permissionId, body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        try {
            // get data Permission in Permissions table
            const permission = await knex.select()
                                    .from('permissions')
                                    .where('id', permissionId).first();
            // check if complete 
            if (!permission){
                // change status to 404 not found and return message error 
                statusCode = 404;
                response.message = 'Permission is not found or not for this user';
            } else {
            
                // update Permissions data
                await knex('Permissions')
                    .update(body)
                    .where('id', permissionId);

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
     * create Permission for Admin
     * @param { id int } adminId
     * @param {
     *  permissions Arrray,
     * } body 
     */
    static async updatePermissionAdmin(adminId,body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) =>  {
            try {
                // GET from body request permissions
                const { permissions } = body
                // delete all permission from user
                await knex('adminpermissions').where('admin_id',adminId).del();
                // access every permission in arrray permissions
                permissions.forEach(async (permission,index) => {
                    // insert data new Permission in Permissions table
                    const newPermission = await knex('adminpermissions').insert({
                        'permission_id': permission[index],
                        'admin_id': adminId
                    });
                    // check if complete 
                    if (!newPermission){
                        // change status to 409  and return data Permission 
                        statusCode = 409;
                        response.message = 'error';
                        resolve({statusCode ,response});
                    }
                })
                resolve({statusCode ,response});
                
            } catch (error) {
                // change status code to 500 server error and put message
                statusCode = 500;
                response.message = 'error in data';
                resolve({statusCode ,response});
            }
        })
    }
    
    /**
     * delete Permission data
     * @param { idPermissions Array} body 
     */
    static async deletePermission(body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { idPermissions } = body;
                // loop of idPermissions
                await idPermissions.forEach( async (permission, index) => {
                    // get data Permission in Permissions table
                    const PermissionsData = await knex.select()
                                    .from('Permissions')
                                    .where('id', permission[index])
                                    .first();
                    // check if complete 
                    if (!PermissionsData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'Permissions is not found';
                        // return resolve data from Promise
                        resolve({statusCode, response});
                    } else {

                        // update Permissions status data AND  who active this Permission
                        await knex('permissions')
                        .where('id', permission[index]).del();
                 

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
    
    /**
     * delete Permission data Admin
     * @param { id int } adminId
     * @param { idPermissions Array} body 
     */
    static async deletePermissionAdmin(adminId,body){
        // init stat for response 
        let response = {};
        let statusCode = 200
        return await new Promise( async (resolve, reject) => {
            try {
                // get specfic data from body request
                const { idPermissions } = body;
                // loop of idPermissions
                await idPermissions.forEach( async (permission, index) => {
                    // get data Permission in Permissions table
                    const PermissionsData = await knex.select()
                                    .from('adminpermissions')
                                    .where('admin_id', adminId)
                                    .where('permission_id', permission[index])
                                    .first();
                    // check if complete 
                    if (!PermissionsData){
                        // change status to 404 not found and return message error 
                        statusCode = 404;
                        response.message = 'Permissions is not found';
                        // return resolve data from Promise
                        resolve({statusCode, response});
                    } else {

                        // update Permissions status data AND  who active this Permission
                        await knex('adminpermissions')
                            .where('admin_id', adminId)
                            .where('permission_id', permission[index]).del();
                 

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

module.exports = Permission;