const { v4: uuidv4 } = require('uuid');

module.exports = function generateID() {
    return uuidv4();
}