const companyRoutes  = require('./companyRoutes');
const employeeRoutes = require('./employeeRoutes');
const categoryRoutes = require('./categoryRoutes');
const apiKeyAuth     = require('../middleware/apiKeyAuth');

module.exports = (app) => {
    app.use('/companies',  apiKeyAuth, companyRoutes);
    app.use('/employees',  apiKeyAuth, employeeRoutes);
    app.use('/categories', apiKeyAuth, categoryRoutes);
};
