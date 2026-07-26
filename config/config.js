require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'company_api_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER_TEST || 'root',
    password: process.env.DB_PASS_TEST || null,
    database: process.env.DB_NAME_TEST || 'company_api_test',
    host: process.env.DB_HOST_TEST || '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER_PROD || 'root',
    password: process.env.DB_PASS_PROD || null,
    database: process.env.DB_NAME_PROD || 'company_api_prod',
    host: process.env.DB_HOST_PROD || '127.0.0.1',
    dialect: 'mysql'
  }
};