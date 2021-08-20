// require express package
const express = require('express');
// require cors header package
const cors = require('cors');
// require cors header package
const bodyParser = require('body-parser');
// require SwaggerUI and yaml
const SwaggerUI = require('swagger-ui-express');
// require config
const options = require('./utils/swager');
// knex file
const knex = require('./databases/knex');
// require bcryptjs
const bcryptjs = require('bcryptjs');


// create instance of express app 
const app = express();
// create variable port 
const port = process.env.PORT || 3000;

// using bluebird Promise as global Promise
global.Promise = require('bluebird');

// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use cors 
app.use(cors());

// require router
require('./start/router')(app);

// use SwaggerUI to route
app.use('/api-docs',SwaggerUI.serve, SwaggerUI.setup(options));

// create admin if not exist
async function createAdmin (){
    const admin = await knex.select("*")
                    .from('admins')
                    .where('username', 'mohamed123').first();
    if(!admin){
        const newadmin = await knex('admins').insert({
            username: 'mohamed123',
            firstName: 'MOH',
            lastName: 'ASD',
            password: await bcryptjs.hash('password', 12),
            status: true
        });
    } else {
        delete admin.password;
        console.log(admin);
    }
};

// error handle
app.use( (error, req, res, next) => {
    // handel status Code number
    const status = req.statusCode || 500;
    // handel message error
    const message = error.message;
    // handel data error
    const data = error.data;
    // push status, message and data
    res.status(status).json({
        message,
        data
    });
});

// listen to port and run app
app.listen(port, () => {
    createAdmin();
    console.log(`app run on port ${port}`);
}) 