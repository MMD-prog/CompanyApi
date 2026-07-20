'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('company_categories', 'createdAt', 'created_at').catch(() => {});
    await queryInterface.renameColumn('company_categories', 'updatedAt', 'updated_at').catch(() => {});

    await queryInterface.removeColumn('categories', 'createdAt').catch(() => {});
    await queryInterface.removeColumn('categories', 'updatedAt').catch(() => {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('company_categories', 'created_at', 'createdAt').catch(() => {});
    await queryInterface.renameColumn('company_categories', 'updated_at', 'updatedAt').catch(() => {});

    await queryInterface.addColumn('categories', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }).catch(() => {});
    await queryInterface.addColumn('categories', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false
    }).catch(() => {});
  },
};