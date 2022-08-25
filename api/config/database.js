require('dotenv').config();
const Sequelize = require('sequelize');
console.log(process.env.DATABASE_URL);
module.exports = new Sequelize(process.env.DATABASE_URL, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});