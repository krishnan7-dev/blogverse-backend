require('dotenv').config();
const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});