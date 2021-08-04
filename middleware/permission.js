// require jwt 
const jwt = require('jsonwebtoken');
// require secret from config
const secret = '';

const isPermission = async (adminId, permission) => {
    // get admin data from admin table
    const admin = req.headers.Autherization;
    // check if it has token
    if (token){
        try{
            // sure if give user have this permission
            const decoded = await jwt.verify(token, secret);
            // put data from decoded to req
            req.user = decoded;
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

module.exports = isPermission;