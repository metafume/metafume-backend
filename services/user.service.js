const User = require('../models/User');

const { calculateAccordsRate } = require('../utils/calculateAccordsRate');
const { MY_FAVORITE, ADD, INCREASE } = require('../configs/constants');

const getUserById = async userId => {
  return await User.findById(userId).populate(MY_FAVORITE);
};

const getUserByEmail = async email => {
  return await User.findOne({ email }).populate(MY_FAVORITE);
};

const setUser = async (email, name, photoUrl) => {
  return await User.create({ email, name, photoUrl });
};

const updateFavoriteAccordsRate = async (userId, cachedProduct, product, option) => {
  const user = await getUserById(userId);

  if (option === ADD) {
    await user.myFavorite.addToSet(product._id);
    await user.favoriteBrand.addToSet(product.brand);
  } else {
    user.myFavorite.pull(product._id);
  }

  const favoriteAccordsRate = user.favoriteAccordsRate.toObject();
    const newAccordsRate = calculateAccordsRate(
      favoriteAccordsRate,
      cachedProduct,
      option === ADD ? INCREASE : null,
    );

    await user.updateOne({ $set: { 'favoriteAccordsRate': [] } });

    newAccordsRate.forEach(accord => {
      user.favoriteAccordsRate.push(accord);
    });

    await user.save();
};

const updateSubscription = async (userId, option) => {
  const user = await getUserById(userId);
  user.isSubscribed = option;
  await user.save();
};

module.exports = {
  getUserById,
  getUserByEmail,
  setUser,
  updateFavoriteAccordsRate,
  updateSubscription,
};
