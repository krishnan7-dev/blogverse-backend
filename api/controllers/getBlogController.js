const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Blog.findAll({
        where: {
            id
        }
    })
        .then((blog) => res.json(blog))
        .catch(err => res.json(err));
});

module.exports = router;