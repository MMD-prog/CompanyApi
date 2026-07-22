const companyRoutes  = require('./companyRoutes');
const employeeRoutes = require('./employeeRoutes');
const categoryRoutes = require('./categoryRoutes');
const basicAuth      = require('../middleware/basicAuth');

module.exports = (app) => {
    app.use('/companies',  basicAuth, companyRoutes);
    app.use('/employees',  basicAuth, employeeRoutes);
    app.use('/categories', basicAuth, categoryRoutes);
};
