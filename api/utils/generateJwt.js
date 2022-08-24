const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('crypto');

module.exports = (username, email, password) => {
    const { privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 512,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    const accessToken = jwt.sign({ 
        username,
        email,
        password
    }, privateKey, { algorithm: 'RS256', expiresIn: '15 days'});
    return accessToken;
};