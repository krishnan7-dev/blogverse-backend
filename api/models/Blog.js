const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('blog', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    author: {
        type: Sequelize.STRING
    }
},
{
    timestamps: false
});