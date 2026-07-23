const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ApiKey = sequelize.define('ApiKey', {
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
    key: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'api_keys',
    timestamps: false
});

module.exports = ApiKey;
