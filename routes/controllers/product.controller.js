const util = require('util');
const { fork } = require('child_process');
const createError = require('http-errors');
const redisClient = require('../../loaders/db').redisClient;
const scraperPath = process.cwd() + '/utils/scraper.js';
const _ = require('lodash');

const MATERIAL_LIST = require('../../mock/materialList.json');

const smembers = util.promisify(redisClient.smembers).bind(redisClient);
const srandmember = util.promisify(redisClient.srandmember).bind(redisClient);
const get = util.promisify(redisClient.get).bind(redisClient);

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
    const targetResult = await get(targetProductId);

    if (targetResult) {
      const parsed = JSON.parse(targetResult);
      redisClient.sadd('recentViewList', parsed.productId);
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

        redisClient.set(payload.productId, JSON.stringify(payload));
        redisClient.sadd('recentViewList', payload.productId);

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
    const data = await srandmember('recentViewList', 10);
    const promisedList = data.map(id => get(id));

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
