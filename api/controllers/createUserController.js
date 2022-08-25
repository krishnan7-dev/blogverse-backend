const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/User');
const generateID = require('../utils/idGenerator');
const ValidateCredentials = require('../validation/validateCredentials');

const saltRounds = 10;

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    const validationResult = await ValidateCredentials(username, email, password);
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