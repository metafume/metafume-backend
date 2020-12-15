const mongoose = require('mongoose');
const redis = require('redis');

const { databaseUrl, mongooseOptions, redisOptions } = require('../configs');

const dbLoader = () => {
  mongoose.connect(databaseUrl, mongooseOptions);
  mongoose.connection.on('error', () => console.error('connection error'));
  mongoose.connection.once('open', () => console.log('mongoose is connected'));
};

const redisClient = redis.createClient(redisOptions);
redisClient.on('error', err => console.error(err));
redisClient.on('connect', () => console.log('redis is connected'));

exports.redisClient = redisClient;
exports.dbLoader = dbLoader;
