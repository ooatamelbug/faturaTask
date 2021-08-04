// require express package
const express = require('express');
// require cors header package
const cors = require('cors');

// create instance of express app 
const app = express();
// create variable port 
const port = process.env.PORT || 3000;

// use cors 
app.use(cors());
// use router
require('./utils/router')(app);

// listen to port and run app
app.listen(port, () => {
    console.log(`app run on port ${port}`);
}) 