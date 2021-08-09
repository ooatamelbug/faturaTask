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

// create instance of express app 
const app = express();
// create variable port 
const port = process.env.PORT || 3000;

// using bluebird Promise as global Promise
global.Promise = require('bluebird');

// use cors 
app.use(cors());
// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use SwaggerUI to route
app.use('/api-docs',SwaggerUI.serve, SwaggerUI.setup(options));
// use router
require('./utils/router')(app);

// listen to port and run app
app.listen(port, () => {
    console.log(`app run on port ${port}`);
}) 