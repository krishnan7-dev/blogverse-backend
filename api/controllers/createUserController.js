const express = require('express');
const router = express.Router();

const User = require('../models/User');

const generateID = require('../utils/idGenerator');

router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    const id = generateID();
    User.create({
        id,
        username,
        email,
        password
    })
        .then(() => {
            res.send('User created successfully');
        })
        .catch(err => res.json(err));
});

module.exports = router;