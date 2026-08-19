const companyRoutes  = require('./companyRoutes');
const employeeRoutes = require('./employeeRoutes');
const categoryRoutes = require('./categoryRoutes');
const authRoutes     = require('./authRoutes');
const healthRoutes   = require('./healthRoutes');
const apiKeyAuth     = require('../middleware/apiKeyAuth');
const basicAuth      = require('../middleware/basicAuth');
const jwtAuth        = require('../middleware/jwtAuth');

module.exports = (app) => {
    app.use('/health',     healthRoutes);
    app.use('/auth',       authRoutes);
    app.use('/companies',  jwtAuth, companyRoutes);
    app.use('/employees',  apiKeyAuth, employeeRoutes);
    app.use('/categories', basicAuth, categoryRoutes);
};
