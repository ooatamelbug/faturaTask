// require express package
const express = require('express');

// create instance of express app 
const app = express();
// create variable port 
const port = process.env.PORT || 3000;


// listen to port and run app
app.listen(port, () => {
    console.log(`app run on port ${port}`);
}) 