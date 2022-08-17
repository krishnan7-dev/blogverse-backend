const express = require('express');
const router = express.Router();

const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog.findAll()
        .then((blogs) => res.json(blogs))
        .catch(err => res.json(err));
});

module.exports = router;