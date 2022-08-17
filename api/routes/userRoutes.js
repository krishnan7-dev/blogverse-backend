const express = require('express');
const router = express.Router();

const createUserController = require('../controllers/createUserController');
const getAllUsersController = require('../controllers/getAllUsersController');
const updateUserController = require('../controllers/updateUserController');
const deleteUserController = require('../controllers/deleteUserController');
const getUserController = require('../controllers/getUserController');

router.use('/', [createUserController, getAllUsersController, updateUserController, deleteUserController, getUserController]);

module.exports = router;