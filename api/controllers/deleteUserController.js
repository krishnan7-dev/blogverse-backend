const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.destroy({
        where: {
            id
        }
    })
        .then(() => res.send('User deleted successfully'))
        .catch(err => res.send(err));
});

module.exports = router;