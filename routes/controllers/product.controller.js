const redis = require('../../lib/redis');
const createError = require('http-errors');
const { scrapWorker } = require('../../utils/scrapWorker');
const _ = require('lodash');

const User = require('../../models/User');

const { getRandomItemList } = require('../../utils/getRandomItemList');

const getSearchList = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const searchList =
      await scrapWorker({ type: 'searchTargetKeyword', payload: keyword });

    res.status(200).json(searchList);
  } catch (err) {
    next(err);
  }
};

const getProductDetail = async (req, res, next) => {
  try {
    const { id: path } = req.query;
    const targetProductId = path.split('/')[1];
    let targetResult = await redis.get(targetProductId);

    if (targetResult) {
      targetResult = JSON.parse(targetResult);
      redis.sadd('recentViewList', targetResult.productId);
      return res.status(200).json(targetResult);
    }

    const product =
      await scrapWorker({ type: 'searchProductDetail', payload: path });

    redis.set(product.productId, product);
    redis.sadd('recentViewList', product.productId);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const getRecentViewList = async (req, res, next) => {
  try {
    const data = await redis.srandmember('recentViewList', 10);
    const promisedList = data.map(id => redis.get(id));

    let recentViewList = await (async promises => {
      return await Promise.all(promises);
    })(promisedList);

    recentViewList = recentViewList.map(product => {
      const { brand, name, productId, imageUrl } = JSON.parse(product);
      return {
        brand,
        name,
        productId,
        imageUrl,
      };
    });

    res.status(200).json(recentViewList);
  } catch (err) {
    next(err);
  }
};

const getRecommendList = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    let cachedRecommendList = await redis.get(user_id);
    cachedRecommendList = JSON.parse(cachedRecommendList);

    if (cachedRecommendList) {
      const randomRecommendList = getRandomItemList(cachedRecommendList, 10);
      return res.status(200).json(randomRecommendList);
    }

    const user = await User.findById(user_id);
    const favoriteAccordsRate = user.favoriteAccordsRate.toObject();
    let target, keyword;

    if (favoriteAccordsRate.length > 0) {
      favoriteAccordsRate.sort((a, b) => b.rate - a.rate);
      target = _.random(0, Math.ceil(favoriteAccordsRate.length / 3));
    }

    if (favoriteAccordsRate[target]) keyword = favoriteAccordsRate[target].name;

    if (!keyword) return next(createError(404));

    const searchList =
      await scrapWorker({ type: 'searchTargetKeyword', payload: keyword });
    const randomRecommendList = getRandomItemList(searchList, 10);

    redis.setex(user_id, 60 * 60 * 12, searchList);
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
