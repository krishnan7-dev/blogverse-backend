const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    Blog.update({ title, content }, {
        where: {
            id
        }
    })
        .then(() => res.send('Blog was updated successfully'))
        .catch(err => res.json(err));
});

module.exports = router;