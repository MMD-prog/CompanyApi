const companyRoutes  = require('./companyRoutes');
const employeeRoutes = require('./employeeRoutes');
const categoryRoutes = require('./categoryRoutes');
const authRoutes     = require('./authRoutes');
const basicAuth      = require('../middleware/basicAuth');

module.exports = (app) => {
    app.use('/auth',       authRoutes);
    app.use('/companies',  basicAuth, companyRoutes);
    app.use('/employees',  employeeRoutes);
    app.use('/categories', categoryRoutes);
};
