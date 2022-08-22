const express = require('express');
const router = express.Router();

const User = require('../models/User');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { generateKeyPair } = require('crypto')
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const { credential, password } = req.body;

    User.findAll({
        where: {
            [Op.or]: [
                { username: credential },
                { email: credential }
            ]
        }
    })
        .then(([user]) => {
            if (user) {
                bcrypt.compare(password, user.dataValues.password)
                    .then((result) => {
                        if (result) {
                            generateKeyPair('rsa', {
                                modulusLength: 512,
                                publicKeyEncoding: {
                                    type: 'spki',
                                    format: 'pem'
                                },
                                privateKeyEncoding: {
                                    type: 'pkcs8',
                                    format: 'pem'
                                }
                            }, (err, publicKey, privateKey) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).json({ err })
                                }
                                const accessToken = jwt.sign({ 
                                    username: user.dataValues.username,
                                    email: user.dataValues.email,
                                    password: user.dataValues.password,
                                }, privateKey, { algorithm: 'RS256', expiresIn: '24h' });
                                res.json({ accessToken });
                            });
                        } else {
                            res.json({ err: "Incorrect password" });
                        }
                    })
            } else {
                res.json({ err: "Username or email does not exist" });
            }
        })
        .catch(err => console.log(err));

    
});

module.exports = router;