// require jwt 
const jwt = require('jsonwebtoken');
// require secret from config
const secret = require('config').get('jwt.secret');
// require knex file
const knex = require('../databases/knex');

const isAuthenticated = async (req, res ,next) => {
    // get token from header
    const token = req.headers.Autherization;
    // check if it has token
    if (token){
        try{
            // verify token to sure if give user data
            const decoded = await jwt.verify(token, secret);
            // sure if this user make logout from system before
            const data = await knex.select()
                            .from('authlogin')
                            .where('token', token);
            //sure if this token is have logout time
            if (data.logouttime && !data.status){
                // return status error and message in not verify
                return res
                    .status(401)
                    .json({
                        succesdatas: false,
                        message: 'token you passed is expire'
                    });    
            }
            // sure if this token is not expire
            // data now
            let now = new Date();
            now.toISOString();

            // 
            const convertDate = moment(now).isAfter(new Date(data.logintime));
            console.log(now);
            console.log(data.expirin);
            console.log(convertDate);
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