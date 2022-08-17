const express = require('express');
const router = express.Router();

const createBlogController = require('../controllers/createBlogController');
const getAllBlogsController = require('../controllers/getAllBlogsController');
const getBlogController = require('../controllers/getBlogController');
const updateBlogController = require('../controllers/updateBlogController');
const deleteBlogController = require('../controllers/deleteBlogController');

router.use('/', [createBlogController, getAllBlogsController, getBlogController, updateBlogController, deleteBlogController]);

module.exports = router;