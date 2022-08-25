const User = require('../models/User');

async function findDuplicateUsername(username) {
    const result = await User.findAll({ where: { username } })
        .then((user) => {
            if (user.length !== 0) {
                console.log(user);
                return { valid: false, error: 'Username is taken' };
            }
            return { valid: true };
        });
    return result;
}

async function findDuplicateEmail(email) {
    const result = await User.findAll({ where: { email } })
        .then(user => {
            if (user.length !== 0) {
                return { valid: false, error: 'Email already exists' };
            }
            return { valid: true };
        });
    return result;
}

async function ValidateCredentials(username, email, password) {
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

    const duplicateUsernameResult = await findDuplicateUsername(username);
    if (!duplicateUsernameResult.valid) {
        return duplicateUsernameResult;
    }
    
    const duplicateEmailResult = await findDuplicateEmail(email);
    if (!duplicateEmailResult.valid) {
        return duplicateEmailResult;
    }

    return { valid: true };
}

module.exports = ValidateCredentials;