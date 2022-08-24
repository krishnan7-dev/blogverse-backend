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

    return { valid: true };
}

module.exports = ValidateCredentials;