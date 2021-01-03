const redis = require('../lib/redis');

const { shuffleList } = require('../utils/shuffleList');
const { RECENT_VIEW_LIST, DAY, MONTH } = require('../configs/constants');

const getProductById = async productId => {
  const targetResult = await redis.get(productId);
  return targetResult ? JSON.parse(targetResult) : null;
};

const setProduct = (productId, product) => {
  redis.setex(productId, MONTH, product);
};

const getRecentViewList = async () => {
  const data = await redis.srandmember(RECENT_VIEW_LIST, 10);
  const promisedList = data.map(id => redis.get(id));
  const recentViewList = await (async promises => {
    return await Promise.all(promises);
  })(promisedList);

  return recentViewList.map(product => {
    const { brand, name, productId, imageUrl } = JSON.parse(product);
    return {
      brand,
      name,
      productId,
      imageUrl,
    };
  });
};

const setProductIdToRecentViewList = productId => {
  redis.sadd(RECENT_VIEW_LIST, productId);
};

const getRecommendListByUserId = async userId => {
  const cachedRecommendList = await redis.get(userId);
  return cachedRecommendList ?
    shuffleList(JSON.parse(cachedRecommendList), 10) : null;
};

const setRecommendList = (userId, searchList) => {
  redis.setex(userId, DAY / 2, searchList);
};

module.exports = {
  getProductById,
  setProduct,
  setProductIdToRecentViewList,
  getRecentViewList,
  setRecommendList,
  getRecommendListByUserId,
};
