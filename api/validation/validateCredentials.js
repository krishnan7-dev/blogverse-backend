const User = require('../models/User');

function ValidateCredentials(username, email, password) {
    const USERNAME_REGEX = /^[A-Za-z0-9_-]{5,}$/g;
    const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const PASSWORD_REGEX = /^[A-Za-z0-9_@#$-]{8,}$/g;
    
    if (!USERNAME_REGEX.test(username)) {
        return { valid: false, error: 'Invalid Username' };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { valid: false, error: 'Invalid Email' };
    }

    if (!PASSWORD_REGEX.test(password)) {
        return { valid: false, error: 'Invalid Password' };
    }

    User.findAll({ where: { username } })
        .then((user) => {
            if (user) {
                return { valid: false, error: 'Username is taken' };
            }
        });
    
    User.findAll({ where: { email } })
        .then(user => {
            if (user) {
                return { valid: false, error: 'Email already exists' };
            }
        });
        
    return { valid: true };
}

module.exports = ValidateCredentials;