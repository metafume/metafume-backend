const redis = require('../../lib/redis');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');
const _ = require('lodash');

const User = require('../../models/User');
const Product = require('../../models/Product');

const { scrapWorker } = require('../../utils/scrapWorker');
const { getRandomItemList } = require('../../utils/getRandomItemList');
const { calculateAccordsRate } = require('../../utils/calculateAccordsRate');

const googleLogin = async (req, res, next) => {
  const user = req.body;
  const { email, name, photoUrl } = user;
  if (!user) return next(createError(400));

  try {
    let targetUser = await User.findOne({ email });

    if (!targetUser) {
      targetUser = await User.create({ email, name, photoUrl });
    }

    const token = jwt.sign({
      _id: targetUser._id,
      email: targetUser.email,
      name: targetUser.name,
      photoUrl: targetUser.photoUrl,
    }, tokenSecretKey, {
      expiresIn: '7d',
    });

    await targetUser.execPopulate('myFavorite');

    res.status(201).json({ result: 'ok', token, user: targetUser });
  } catch (err) {
    next(err);
  }
};

const tokenLogin = async (req, res, next) => {
  const { token } = req.body;
  if (!token) return next(createError(400));

  try {
    const { email } = jwt.verify(token, tokenSecretKey);
    const targetUser = await User.findOne({ email });

    if (!targetUser) return next(createError(401));

    await targetUser.execPopulate('myFavorite');

    res.status(200).json({ result: 'ok', token, user: targetUser });
  } catch (err) {
    next(createError(401));
  }
};

const addFavoriteProduct = async (req, res, next) => {
  try {
    const { product_id, user_id } = req.params;
    let cachedTargetProduct = await redis.get(product_id);
    cachedTargetProduct = JSON.parse(cachedTargetProduct);

    let targetProduct = await Product.findOne({ productId: product_id });

    if (!targetProduct) {
      targetProduct = await Product.create({
        productId: product_id,
        brand: cachedTargetProduct.brand,
        name: cachedTargetProduct.name,
        imageUrl: cachedTargetProduct.imageUrl,
      });
    }

    const user = await User.findById(user_id);

    await user.myFavorite.addToSet(targetProduct._id);
    await user.favoriteBrand.addToSet(targetProduct.brand);

    const favoriteAccordsRate = user.favoriteAccordsRate.toObject();
    const newAccordsRate = calculateAccordsRate(
      favoriteAccordsRate,
      cachedTargetProduct,
      'increase',
    );

    await user.updateOne({ $set: { 'favoriteAccordsRate': [] } });

    newAccordsRate.forEach(accord => {
      user.favoriteAccordsRate.push(accord);
    });

    await user.save();

    res.status(200).json({ result: 'ok', product: targetProduct });
  } catch (err) {
    next(err);
  }
};

const deleteFavoriteProduct = async (req, res, next) => {
  try {
    const { product_id, user_id } = req.params;

    const user = await User.findById(user_id);
    const targetProduct = await Product.findOne({ productId: product_id });
    let cachedTargetProduct = await redis.get(product_id);
    cachedTargetProduct = JSON.parse(cachedTargetProduct);

    user.myFavorite.pull(targetProduct._id);

    const favoriteAccordsRate = user.favoriteAccordsRate.toObject();
    const newAccordsRate = calculateAccordsRate(
      favoriteAccordsRate,
      cachedTargetProduct,
    );

    await user.updateOne({ $set: { 'favoriteAccordsRate': [] } });

    newAccordsRate.forEach(accord => {
      user.favoriteAccordsRate.push(accord);
    });

    await user.save();

    res.status(200).json({ result: 'ok' });
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

const subscribeMail = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);

    user.isSubscribed = true;
    await user.save();

    res.status(200).json({ result: 'ok' });
  } catch (err) {
    next(err);
  }
};

const unsubscribeMail = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);

    user.isSubscribed = false;
    await user.save();

    res.status(200).json({ result: 'ok' });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  googleLogin,
  tokenLogin,
  addFavoriteProduct,
  deleteFavoriteProduct,
  getRecommendList,
  subscribeMail,
  unsubscribeMail,
};
