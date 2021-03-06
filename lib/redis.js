const util = require('util');
const { redisClient } = require('../loaders/db');

const smembers = util.promisify(redisClient.smembers).bind(redisClient);
const srandmember = util.promisify(redisClient.srandmember).bind(redisClient);
const get = util.promisify(redisClient.get).bind(redisClient);

const sadd = (key, value) => redisClient.sadd(key, value);
const set = (key, value) => redisClient.set(key, JSON.stringify(value));
const setex = (key, seconds, value) => redisClient.setex(key, seconds, JSON.stringify(value));

module.exports = {
  smembers,
  srandmember,
  get,
  sadd,
  set,
  setex,
};
