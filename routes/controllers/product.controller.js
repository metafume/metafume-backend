const redis = require('../../lib/redis');
const { scrapWorker } = require('../../utils/scrapWorker');

const MATERIAL_LIST = require('../../mock/materialList.json');

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
    const targetResult = await redis.get(targetProductId);

    if (targetResult) {
      const parsed = JSON.parse(targetResult);
      redis.sadd('recentViewList', parsed.productId);
      return res.send(targetResult);
    }

    const product =
      await scrapWorker({ type: 'searchProductDetail', payload: path });

    const mapImagePathToNote = product.notes.map(note => {
      const targetName = note.toLowerCase().replace(/\s/g, '');
      const isPath = MATERIAL_LIST.find(note => note.name === targetName);

      if (isPath) return isPath;
      return note;
    });

    product.notes = mapImagePathToNote;

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

module.exports = {
  getSearchList,
  getProductDetail,
  getRecentViewList,
};
