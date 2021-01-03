const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const userService = require('../../services/user.service');
const productService = require('../../services/product.service');
const cacheService = require('../../services/cache.service');

const scraper = require('../../utils/scraper');
const { shuffleList } = require('../../utils/shuffleList');
const { tokenSecretKey } = require('../../configs');
const { OK, ADD } = require('../../configs/constants');

const googleLogin = async (req, res, next) => {
  const user = req.body;
  const { email, name, photoUrl } = user;

  if (!email) return next(createError(400));

  try {
    let user = await userService.getUserByEmail(email);

    if (!user) {
      user = await userService.setUser({ email, name, photoUrl });
    }

    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      name: user.name,
      photoUrl: user.photoUrl,
    }, tokenSecretKey, {
      expiresIn: '7d',
    });

    res.status(201).json({ result: OK, token, user });
  } catch (err) {
    next(err);
  }
};

const tokenLogin = async (req, res, next) => {
  const { token } = req.body;
  if (!token) return next(createError(400));

  try {
    const { email } = jwt.verify(token, tokenSecretKey);
    const user = await userService.getUserByEmail(email);

    if (!user) return next(createError(401));

    res.status(201).json({ result: OK, token, user: user });
  } catch (err) {
    next(createError(401));
  }
};

const addFavoriteProduct = async (req, res, next) => {
  try {
    const { product_id, user_id } = req.params;
    const cachedProduct = await cacheService.getProductById(product_id);
    let product = await productService.getProductById(product_id);

    if (!product) {
      product = await productService.setProduct(product_id, cachedProduct);
    }

    await userService.updateFavoriteAccordsRate(user_id, cachedProduct, product, ADD);

    res.status(200).json({ result: OK, product: product });
  } catch (err) {
    next(err);
  }
};

const deleteFavoriteProduct = async (req, res, next) => {
  try {
    const { product_id, user_id } = req.params;
    const cachedProduct = await cacheService.getProductById(product_id);
    const product = await productService.getProductById(product_id);

    await userService.updateFavoriteAccordsRate(user_id, cachedProduct, product);

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

    await userService.updateSubscription(user_id, option);

    res.status(200).json({ result: OK, isSubscribed: option });
  } catch (err) {
    next(err);
  }
};

const getRecommendList = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const recommendList = await cacheService.getRecommendListByUserId(user_id);

    if (recommendList) return res.status(200).json(recommendList);

    const keyword = await userService.getKeywordFromFavoriteAccordsByUserId(user_id);

    if (!keyword) return next(createError(404));

    const searchList = await scraper.searchTargetKeyword(keyword);
    const randomRecommendList = shuffleList(searchList, 10);
    cacheService.setRecommendList(user_id, searchList);

    res.status(200).json(randomRecommendList);
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
  getRecommendList,
};
