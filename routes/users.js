const express = require('express');
const userController = require('./controllers/user.controller');
const { verifyToken } = require('./middlewares/authorization');
const { USERS } = require('../configs/constants').ROUTE;

const router = express.Router();

router.post(USERS.LOGIN.GOOGLE, userController.googleLogin);
router.post(USERS.LOGIN.TOKEN, userController.tokenLogin);
router.post(USERS.FAVORITE.ADD, verifyToken, userController.addFavoriteProduct);
router.delete(USERS.FAVORITE.DELETE, verifyToken, userController.deleteFavoriteProduct);
router.put(USERS.SUBSCRIPTION, verifyToken, userController.subscribeMail);

module.exports = router;
