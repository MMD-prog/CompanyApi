'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('api_keys', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            key: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: true
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('api_keys');
    }
};
