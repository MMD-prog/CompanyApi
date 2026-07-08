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
    updatedAt: true,
    defaultScope: {
        attributes: { exclude: ['deletedAt', 'deleted_at'] },
        order: [['id', 'ASC']]
    },
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
