const createError = require('http-errors');
const cacheService = require('../../services/cache.service');

const scraper = require('../../utils/scraper');
const { shuffleList } = require('../../utils/shuffleList');

const getSearchList = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const searchList = await scraper.searchTargetKeyword(keyword);
    res.status(200).json(searchList);
  } catch (err) {
    next(err);
  }
};

const getProductDetail = async (req, res, next) => {
  try {
    const { id: path } = req.query;
    const productId = path.split('/')[1];
    let product = await cacheService.getProductById(productId);

    if (product) {
      cacheService.setProductIdToRecentViewList(product.productId);
      return res.status(200).json(product);
    }

    product = await scraper.searchProductDetail(path);
    cacheService.setProduct(product.productId, product);
    cacheService.setProductIdToRecentViewList(product.productId);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const getRecentViewList = async (req, res, next) => {
  try {
    const recentViewList = await cacheService.getRecentViewList();
    res.status(200).json(recentViewList);
  } catch (err) {
    next(err);
  }
};

const getRecommendList = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const recommendList = await cacheService.getRecommendListByUserId(user_id);

    if (recommendList) return res.status(200).json(recommendList);

    const keyword = await cacheService.getKeywordFromFavoriteAccordsByUserId(user_id);

    if (!keyword) return next(createError(404));

    const searchList = await scraper.searchTargetKeyword(keyword);
    const randomRecommendList = shuffleList(searchList, 10);
    cacheService.setRecommendList(user_id, searchList);

    res.status(200).json(randomRecommendList);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSearchList,
  getProductDetail,
  getRecentViewList,
  getRecommendList,
};
