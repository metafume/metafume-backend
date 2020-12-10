const express = require('express');
const userController = require('./controllers/user.controller');
const verifyToken = require('./middlewares/authorization').verifyToken;

const router = express.Router();

router.post('/login/google', userController.googleLogin);
router.post('/login/token', userController.tokenLogin);
router.post('/:user_id/favorite/:product_id', verifyToken, userController.addFavoriteProduct);
router.delete('/:user_id/favorite/:product_id', verifyToken, userController.deleteFavoriteProduct);

module.exports = router;
