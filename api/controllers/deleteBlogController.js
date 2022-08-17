const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Blog.destroy({
        where: {
            id
        }
    })
        .then(() => res.send('Blog was deleted successfully'))
        .catch(err => res.json(err));
});

module.exports = router;