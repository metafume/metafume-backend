const express = require('express');
const productController = require('./controllers/product.controller');

const router = express.Router();

router.get('/search', productController.getSearchList);

module.exports = router;
