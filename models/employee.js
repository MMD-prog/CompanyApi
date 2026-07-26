const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        unique: true
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
    defaultScope: {
        attributes: { exclude: ['deleted_at'] },
        order: [['id', 'ASC']]
    },
});

module.exports = Employee;
