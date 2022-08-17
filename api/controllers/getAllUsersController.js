const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res) => {
    User.findAll()
        .then((users) => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;