// require express package
const express = require('express');
// require cors header package
const cors = require('cors');
// require cors header package
const bodyParser = require('body-parser');

// create instance of express app 
const app = express();
// create variable port 
const port = process.env.PORT || 3000;

global.Promise = require('bluebird');

// use cors 
app.use(cors());
// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use router
require('./utils/router')(app);

// listen to port and run app
app.listen(port, () => {
    console.log(`app run on port ${port}`);
}) 