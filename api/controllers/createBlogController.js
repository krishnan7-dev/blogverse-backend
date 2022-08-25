const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');

const generateID = require('../utils/idGenerator');
const ValidateBlog = require('../validation/validateBlog');

router.post('/', (req, res) => {
    const { title, content, author } = req.body;

    const validationResult = ValidateBlog(title, content);
    if (!validationResult.valid) {
        return res.json({ error: validationResult.error });
    }
    
    const id = generateID();
    Blog.create({
        id,
        title,
        content,
        author
    })
        .then(() => res.send('Blog created successfully'))
        .catch(err => res.json(err));
});

module.exports = router;