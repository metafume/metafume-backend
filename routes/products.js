const express = require('express');
const productController = require('./controllers/product.controller');

const router = express.Router();

router.get('/search', productController.getSearchList);
router.get('/detail', productController.getProductDetail);
router.get('/recent', productController.getRecentViewList);

module.exports = router;
