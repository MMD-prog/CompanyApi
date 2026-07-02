const { Op } = require('sequelize');
const sequelize = require('./db');
const { Company, Employee, Category } = require('./models');

module.exports = { Op, sequelize, Company, Employee, Category};
