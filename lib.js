const { Op } = require('sequelize');
const sequelize = require('./db');
const { Company, Employee, Category, User } = require('./models');

module.exports = { Op, sequelize, Company, Employee, Category, User };
