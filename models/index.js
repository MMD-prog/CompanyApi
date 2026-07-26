const Company = require('./company');
const Employee = require('./employee');
const Category = require('./category');

Company.hasMany(Employee, { foreignKey: 'company_id'});
Employee.belongsTo(Company, { foreignKey: 'company_id' });

Company.belongsToMany(Category, {
    through: 'company_categories',
    foreignKey: 'company_id',
    onDelete: 'CASCADE'
});
Category.belongsToMany(Company, {
    through: 'company_categories',
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

module.exports = { Company, Employee, Category };
