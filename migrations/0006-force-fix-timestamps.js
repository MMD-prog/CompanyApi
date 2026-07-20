'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('companies', 'createdAt', 'created_at').catch(() => {});
    await queryInterface.renameColumn('companies', 'updatedAt', 'updated_at').catch(() => {});
    await queryInterface.renameColumn('companies', 'deletedAt', 'deleted_at').catch(() => {});

    await queryInterface.renameColumn('employees', 'createdAt', 'created_at').catch(() => {});
    await queryInterface.renameColumn('employees', 'updatedAt', 'updated_at').catch(() => {});
    await queryInterface.renameColumn('employees', 'deletedAt', 'deleted_at').catch(() => {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('companies', 'created_at', 'createdAt').catch(() => {});
    await queryInterface.renameColumn('companies', 'updated_at', 'updatedAt').catch(() => {});
    await queryInterface.renameColumn('companies', 'deleted_at', 'deletedAt').catch(() => {});

    await queryInterface.renameColumn('employees', 'created_at', 'createdAt').catch(() => {});
    await queryInterface.renameColumn('employees', 'updated_at', 'updatedAt').catch(() => {});
    await queryInterface.renameColumn('employees', 'deleted_at', 'deletedAt').catch(() => {});
  }
};
