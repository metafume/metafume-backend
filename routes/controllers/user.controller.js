const createError = require('http-errors');
const redis = require('../../lib/redis');
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');

const User = require('../../models/User');
const Product = require('../../models/Product');

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

    let favoriteAccordsRate = user.favoriteAccordsRate.toObject();
    favoriteAccordsRate = favoriteAccordsRate.reduce((obj, accord) => {
      obj[accord.name] = { rate: accord.rate, color: accord.color };
      return obj;
    }, {});

    let calculatedAccordsRate = cachedTargetProduct.accords.reduce((obj, accord) => {
      if (obj[accord.name]) {
        obj[accord.name].rate += parseInt(accord.styles.width);
      } else {
        obj[accord.name] = {
          rate: parseInt(accord.styles.width),
          color: accord.styles.background,
        };
      }
      return obj;
    }, favoriteAccordsRate);

    calculatedAccordsRate = Object.entries(calculatedAccordsRate)
      .map(([key, value]) => ({ name: key, ...value }));

    await user.updateOne({ $set: { 'favoriteAccordsRate': [] } });

    calculatedAccordsRate.forEach(accord => {
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

    let favoriteAccordsRate = user.favoriteAccordsRate.toObject();
    favoriteAccordsRate = favoriteAccordsRate.reduce((obj, accord) => {
      obj[accord.name] = { rate: accord.rate, color: accord.color };
      return obj;
    }, {});

    let calculatedAccordsRate = cachedTargetProduct.accords.reduce((obj, accord) => {
      if (obj[accord.name]) {
        const rate = parseInt(accord.styles.width);
        obj[accord.name].rate -= rate;
        if(obj[accord.name].rate <= 0) delete obj[accord.name];
      }
      return obj;
    }, favoriteAccordsRate);

    calculatedAccordsRate = Object.entries(calculatedAccordsRate)
      .map(([key, value]) => ({ name: key, ...value }));

    await user.updateOne({ $set: { 'favoriteAccordsRate': [] } });

    calculatedAccordsRate.forEach(accord => {
      user.favoriteAccordsRate.push(accord);
    });

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
};
