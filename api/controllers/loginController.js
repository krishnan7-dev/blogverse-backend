const express = require('express');
const router = express.Router();

const User = require('../models/User');

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const generateJwt  = require('../utils/generateJwt');

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
                            const accessToken = generateJwt(user.dataValues.username, user.dataValues.email, password);
                            return res.json({ accessToken });
                        } else {
                            res.json({ err: "Incorrect password" });
                        }
                    });
            } else {
                res.json({ err: "Username or email does not exist" });
            }
        })
        .catch(err => console.log(err));

    
});

module.exports = router;