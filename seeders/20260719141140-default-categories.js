'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Backend1' },
      { name: 'Frontend1' },
      { name: 'DevOps1' },
      { name: 'Quality Assurance1' },
      { name: 'Data Science1' },
      { name: 'Mobile Development1' },
      { name: 'Product Management1' },
      { name: 'UX/UI Design1' },
      { name: 'Cyber Security1' },
      { name: 'Cloud Architecture1' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: [
        'Backend',
        'Frontend',
        'DevOps',
        'Quality Assurance',
        'Data Science',
        'Mobile Development',
        'Product Management',
        'UX/UI Design',
        'Cyber Security',
        'Cloud Architecture'
      ]
    }, {});
  }
};
