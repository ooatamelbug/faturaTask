// require knex file
const knex = require('../databases/knex');

const isPermission = permission => { 
    return async (req, res, next) => {
        const adminId = req.user.id;
        // get admin data from admin table
        const admin = await knex.select()
                                .from('admins')
                                .where('id', adminId);
        // check if it has account
        if (admin){
            try{
                // sure if give user have this permission
                const permissionForUser = await knex.select(
                                            'p.name as pname'
                                        )
                                        .from('adminpermissions AS ap')
                                        .innerJoin('permissions AS p', 'ap.permission_id', 'p.id')
                                        .where('ap.admin_id', adminId);
                const permissionName = permissionForUser.map( name => permissionForUser.pname);
                // check if have this permission name
                if (!permissionName.include(permission)){
                    return res
                        .status(401)
                        .json({
                            success: false,
                            message: 'not permission to this path'
                        });    
                }
                // return permission ok
                next();
            }catch(err){
                // return status error and message in not verify
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: 'token you passed is expire'
                    });
            }
        }else{
        // return status error and message in no token
        return res
            .status(401)
            .json({
                success: false,
                message: 'no user to passed'
            });
        }
    }
}

module.exports = isPermission;