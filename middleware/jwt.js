// require jwt 
const jwt = require('jsonwebtoken');
// require secret from config
const secret = '';

const isAuthenticated = async (req, res ,next) => {
    // get token from header
    const token = req.headers.Autherization;
    // check if it has token
    if (token){
        try{
            // verify token to sure if give user data
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
                message: 'no token to passed'
            });
    }

}

module.exports = isAuthenticated;