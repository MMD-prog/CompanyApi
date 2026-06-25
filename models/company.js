const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
    },
    address: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'companies',
    timestamps: true,
    paranoid: true,
    underscored: true,
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['name']
        },
        {
            unique: true,
            fields: ['email']
        }
    ]
});

module.exports = Company;
