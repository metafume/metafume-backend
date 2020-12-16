const express = require('express');
const productController = require('./controllers/product.controller');
const { verifyToken } = require('./middlewares/authorization');

const router = express.Router();

router.get('/search', productController.getSearchList);
router.get('/detail', productController.getProductDetail);
router.get('/recent', productController.getRecentViewList);
router.get('/recommendation/:user_id', verifyToken, productController.getRecommendList);

module.exports = router;
