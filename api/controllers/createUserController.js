const express = require('express');
const router = express.Router();

const User = require('../models/User');

const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    User.create({
        id: uuidv4(),
        username: username,
        email: email,
        password: password
    })
        .then(() => {
            res.send('User created successfully');
        })
        .catch(err => res.send(err));
});

module.exports = router;