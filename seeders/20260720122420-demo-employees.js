'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const [companies] = await queryInterface.sequelize.query(
      `SELECT id, name FROM companies WHERE name IN ('Bank Al Ethiad', 'Oracle');`
    );

    if (companies.length < 2) {
      console.warn("Required companies not found. Make sure the companies seeder ran first.");
      return;
    }

    const baeCompanyId = companies.find(c => c.name === 'Bank Al Ethiad').id;
    const oracleCompanyId = companies.find(c => c.name === 'Oracle').id;

    await queryInterface.bulkInsert('employees', [
      {
        name: 'Mousa Estefan',
        email: 'm.estefan@bankaletihad.com',
        company_id: baeCompanyId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Amer Huzayen',
        email: 'A.huzayen@oracle.com',
        company_id: oracleCompanyId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', {
      email: ['alice.smith@bankaletihad.com', 'bob.jones@oracle.com']
    }, {});
  }
};
