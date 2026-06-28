const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true }
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: { model: 'companies', key: 'id' }
    }
}, {
    tableName: 'employees',
    timestamps: true,
    paranoid: true,
    underscored: true,
    updatedAt: false
});

module.exports = Employee;
