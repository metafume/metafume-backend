const express = require('express');
const userController = require('./controllers/user.controller');
const verifyToken = require('./middlewares/authorization').verifyToken;

const router = express.Router();

router.post('/login/google', userController.googleLogin);
router.post('/login/token', userController.tokenLogin);

module.exports = router;
