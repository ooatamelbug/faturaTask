// require all route system 
const adminRoute = require('../routes/adminRoutes');
const userRoute = require('../routes/userRoutes');

// exports  route and use it in app
module.exports = app => {
    app.use('api/admin', adminRoute);
    app.use('api/user', userRoute);
}