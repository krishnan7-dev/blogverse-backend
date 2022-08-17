const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');

const generateID = require('../utils/idGenerator');

router.post('/', (req, res) => {
    const { title, content, author_id } = req.body;
    const id = generateID();
    Blog.create({
        id,
        title,
        content,
        author_id
    })
        .then(() => res.send('Blog created successfully'))
        .catch(err => res.json(err));
});

module.exports = router;