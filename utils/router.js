// require all route system 
const adminRoute = require('../routes/adminRoutes');
const userRoute = require('../routes/userRoutes');
const postRoutes = require('../routes/postRoutes');
const authRoutes = require('../routes/authRoutes');
const permissionRoutes = require('../routes/permissionRoutes');

// exports  route and use it in app
module.exports = app => {
    app.use('api/admin', adminRoute);
    app.use('api/user', userRoute);
    app.use('api/post', postRoutes);
    app.use('api/auth', authRoutes);
    app.use('api/permission', permissionRoutes);
}