require('dotenv').config();
const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.PG_NAME, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});