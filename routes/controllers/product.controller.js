const { fork } = require('child_process');
const createError = require('http-errors');
const redisClient = require('../../loaders/db').redisClient;
const util = require('util');
const scraper = require('../../utils/scraper');

const MATERIAL_LIST = require('../../mock/materialList.json');

const smembers = util.promisify(redisClient.smembers).bind(redisClient);
const get = util.promisify(redisClient.get).bind(redisClient);

const getSearchList = (req, res, next) => {
  try {
    const { keyword } = req.query;
    const childProcess = fork(process.cwd() + '/utils/scraper.js');

    childProcess.on('message', ({ type, payload }) => {
      if (type === 'error') next(createError(404));
      res.send(payload);
    });

    childProcess.on('error', err => {
      next(err);
    });

    childProcess.send({ type: 'getSearchList', payload: keyword });
  } catch (err) {
    console.log(err);
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

    const result = await scraper.searchProductDetail(path);
    const mapImagePathToNote = result.notes.map(note => {
      const targetName = note.toLowerCase().replace(/\s/g, '');
      const isPath = MATERIAL_LIST.find(note => note.name === targetName);

      if (isPath) return isPath;
      return note;
    });

    result.notes = mapImagePathToNote;

    redisClient.set(result.productId, JSON.stringify(result));
    redisClient.sadd('recentViewList', result.productId);

    res.send(result);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
};

const getRecentViewList = async (req, res, next) => {
  try {
    const data = await smembers('recentViewList');
    const promisedList = data.map(id => get(id));

    let recentViewList = await (async promises => {
      return await Promise.all(promises);
    })(promisedList);

    recentViewList = recentViewList.map(product => {
      const parsed = JSON.parse(product);
      return {
        brand: parsed.brand,
        name: parsed.name,
        productId: parsed.productId,
        imageUrl: parsed.imageUrl,
      };
    });

    res.send(recentViewList);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { getSearchList, getProductDetail, getRecentViewList };
