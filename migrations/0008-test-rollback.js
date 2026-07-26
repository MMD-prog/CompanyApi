'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const TestingRollback = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('employees', 'test_column', {
        type: Sequelize.STRING,
        allowNull: true
      }, 
      { 
        transaction: TestingRollback 

      });

      throw new Error('Intentional rollback — testing that this column never gets created');

      await TestingRollback.commit();
    } 
    catch (err) {
      await TestingRollback.rollback();
      console.log('Rollback triggered successfully:', err.message);
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('employees', 'test_column').catch(() => {});
  }
};
