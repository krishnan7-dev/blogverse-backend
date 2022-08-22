const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');
const generateID = require('../utils/idGenerator');

const saltRounds = 10;

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

router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    const validationResult = ValidateCredentials(username, email, password);
    if (!validationResult.valid) {
        return res.json({ err: validationResult.error });
    }

    const id = generateID();

    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            User.create({
                id: id,
                username: username,
                email: email,
                password: hash
            })
                .then(() => {
                    res.json({ message: 'User created successfully' });
                })
                .catch(err => res.json(err));
        })
        .catch(err => console.log(err));
});

module.exports = router;