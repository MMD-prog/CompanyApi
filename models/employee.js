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
    updatedAt: true,
    defaultScope: {
        attributes: { exclude: ['deletedAt', 'deleted_at'] },
        order: [['id', 'ASC']]
    },
    indexes: [
        {
            unique: true,
            fields: ['email','name']
        }
    ]
});

module.exports = Employee;
