const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('user', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
});