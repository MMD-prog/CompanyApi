'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('employees', ['company_id'], { name: 'idx_employees_company_id' });
    await queryInterface.addIndex('companies', ['name'], { name: 'idx_companies_name' });
    await queryInterface.addIndex('employees', ['name'], { name: 'idx_employees_name' });
    await queryInterface.addIndex('company_categories', ['company_id', 'category_id'], {
      unique: true,
      name: 'idx_company_category_composite'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('employees', 'idx_employees_company_id');
    await queryInterface.removeIndex('companies', 'idx_companies_name');
    await queryInterface.removeIndex('employees', 'idx_employees_name');
    await queryInterface.removeIndex('company_categories', 'idx_company_category_composite');
  }
};
