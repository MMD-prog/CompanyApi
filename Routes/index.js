const companyRoutes  = require('./companyRoutes');
const employeeRoutes = require('./employeeRoutes');
const categoryRoutes = require('./categoryRoutes');

module.exports = (app) => {
    app.use('/companies',  companyRoutes);
    app.use('/employees',  employeeRoutes);
    app.use('/categories', categoryRoutes);
};
