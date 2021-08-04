// require all route system 
const adminRoute = require('../routes/adminRoutes');

// exports  route and use it in app
module.exports = app => {
    app.use('api/admin', adminRoute);
}