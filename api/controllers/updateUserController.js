const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.put('/:id', (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;
    User.update({ username, email, password }, {
        where: {
            id
        }
    })
        .then(() => res.send('User updated successfully'))
        .catch(err => res.send(err));
});

module.exports = router;