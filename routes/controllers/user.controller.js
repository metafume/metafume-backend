const redis = require('../../lib/redis');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');

const User = require('../../models/User');
const Product = require('../../models/Product');

const { calculateAccordsRate } = require('../../utils/calculateAccordsRate');
const { OK, INCREASE, MY_FAVORITE } = require('../../configs/constants');

const googleLogin = async (req, res, next) => {
  const user = req.body;
  const { email, name, photoUrl } = user;

  if (!email) return next(createError(400));

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

    await targetUser.execPopulate(MY_FAVORITE);

    res.status(201).json({ result: OK, token, user: targetUser });
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

    await targetUser.execPopulate(MY_FAVORITE);

    res.status(201).json({ result: OK, token, user: targetUser });
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
      INCREASE,
    );

    await user.updateOne({ $set: { 'favoriteAccordsRate': [] } });

    newAccordsRate.forEach(accord => {
      user.favoriteAccordsRate.push(accord);
    });

    await user.save();

    res.status(200).json({ result: OK, product: targetProduct });
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

    res.status(200).json({ result: OK });
  } catch (err) {
    next(err);
  }
};

const subscribeMail = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { option } = req.body;

    if (typeof option !== 'boolean') return next(createError(403));

    const user = await User.findById(user_id);
    user.isSubscribed = option;
    await user.save();

    res.status(200).json({ result: OK, isSubscribed: option });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  googleLogin,
  tokenLogin,
  addFavoriteProduct,
  deleteFavoriteProduct,
  subscribeMail,
};
