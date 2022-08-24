const express = require('express');
const router = express.Router();

const User = require('../models/User');
const generateJwt = require('../utils/generateJwt');
const ValidateCredentials = require('../validation/validateCredentials');

const bcrypt = require('bcrypt');

const saltRounds = 10;

router.put('/:id', (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;

    const validationResult = ValidateCredentials(username, email, password);
    if (!validationResult.valid) {
        return res.json({ err: validationResult.error });
    }

    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            User.update({ username, email, hash }, {
                where: {
                    id
                }
            })
                .then(() => {
                    const accessToken = generateJwt(id, username, email, password);
                    return res.json({ accessToken });
                })
                .catch(err => res.json(err));
        })
});

module.exports = router;