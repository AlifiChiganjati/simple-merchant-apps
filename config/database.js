require('dotenv').config()
const Sequelize = require('sequelize')

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD, {
    host: process.env.HOST_NAME,
    dialect: process.env.DRIVER, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    // logging: false
});