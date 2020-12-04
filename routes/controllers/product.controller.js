const createError = require('http-errors');
const scraper = require('../../utils/scraper');

// const DUMMY = require('../../mock/searchList.json');
// const DUMMY_PRODUCT_DETAIL = require('../../mock/product.json');

const getSearchList = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const result = await scraper.searchTargetKeyword(keyword);
    res.send(result);
    // res.send(DUMMY);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
};

const getProductDetail = async (req, res, next) => {
  try {
    const { id: path } = req.query;
    const result = await scraper.searchProductDetail(path);
    res.send(result);
    // res.send(DUMMY_PRODUCT_DETAIL);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
};

module.exports = { getSearchList, getProductDetail };
