const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Company = sequelize.define('Company', {
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
    address: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'companies',
    timestamps: true,
    paranoid: true,
    underscored: true,
    defaultScope: {
        attributes: { exclude: ['deleted_at'] },
        order: [['id', 'ASC']]
    },
});

module.exports = Company;
