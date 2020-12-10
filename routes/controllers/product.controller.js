const { fork } = require('child_process');
const createError = require('http-errors');
const redis = require('../../lib/redis');
const scraperPath = process.cwd() + '/utils/scraper.js';

const MATERIAL_LIST = require('../../mock/materialList.json');

const getSearchList = (req, res, next) => {
  try {
    const { keyword } = req.query;
    const childProcess = fork(scraperPath);

    childProcess.on('message', ({ type, payload }) => {
      if (!payload) next(createError(404));
      if (type === 'error') next(payload);
      res.send(payload);
    });

    childProcess.on('error', err => {
      next(err);
    });

    childProcess.send({ type: 'searchTargetKeyword', payload: keyword });
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

    const childProcess = fork(scraperPath);

    childProcess.on('message', ({ type, payload }) => {
      try {
        if (!payload) next(createError(404));
        if (type === 'error') next(payload);

        const mapImagePathToNote = payload.notes.map(note => {
          const targetName = note.toLowerCase().replace(/\s/g, '');
          const isPath = MATERIAL_LIST.find(note => note.name === targetName);

          if (isPath) return isPath;
          return note;
        });

        payload.notes = mapImagePathToNote;

        redis.set(payload.productId, payload);
        redis.sadd('recentViewList', payload.productId);

        res.send(payload);
      } catch (err) {
        next(err);
      }
    });

    childProcess.on('error', err => {
      next(err);
    });

    childProcess.send({ type: 'searchProductDetail', payload: path });
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

    res.send(recentViewList);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSearchList,
  getProductDetail,
  getRecentViewList,
};
