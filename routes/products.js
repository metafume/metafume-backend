const express = require('express');
const productController = require('./controllers/product.controller');
const { PRODUCTS } = require('../configs/constants').ROUTE;

const router = express.Router();

router.get(PRODUCTS.SEARCH, productController.getSearchList);
router.get(PRODUCTS.DETAIL, productController.getProductDetail);
router.get(PRODUCTS.RECENT, productController.getRecentViewList);

module.exports = router;
