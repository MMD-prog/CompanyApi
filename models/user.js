const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    defaultScope: {
        attributes: { exclude: ['password', 'deleted_at'] },
        order: [['id', 'ASC']]
    },
    scopes: {
        withPassword: {
            attributes: { exclude: ['deleted_at'] }
        }
    }
});

module.exports = User;
