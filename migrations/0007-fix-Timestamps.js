'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
        await queryInterface.sequelize.query('ALTER TABLE employees RENAME COLUMN createdAt TO created_at;');
        await queryInterface.sequelize.query('ALTER TABLE employees RENAME COLUMN updatedAt TO updated_at;');
    } catch(e) {}
    
    try {
        await queryInterface.sequelize.query('ALTER TABLE company_categories RENAME COLUMN createdAt TO created_at;');
        await queryInterface.sequelize.query('ALTER TABLE company_categories RENAME COLUMN updatedAt TO updated_at;');
    } catch(e) {}
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('ALTER TABLE companies RENAME COLUMN created_at TO createdAt;');
    await queryInterface.sequelize.query('ALTER TABLE companies RENAME COLUMN updated_at TO updatedAt;');
    await queryInterface.sequelize.query('ALTER TABLE employees RENAME COLUMN created_at TO createdAt;');
    await queryInterface.sequelize.query('ALTER TABLE employees RENAME COLUMN updated_at TO updatedAt;');
  }
};