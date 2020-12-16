const express = require('express');
const productController = require('./controllers/product.controller');
const { verifyToken } = require('./middlewares/authorization');
const { PRODUCTS } = require('../configs/constants').ROUTE;

const router = express.Router();

router.get(PRODUCTS.SEARCH, productController.getSearchList);
router.get(PRODUCTS.DETAIL, productController.getProductDetail);
router.get(PRODUCTS.RECENT, productController.getRecentViewList);
router.get(PRODUCTS.RECOMMENDATION, verifyToken, productController.getRecommendList);

module.exports = router;
