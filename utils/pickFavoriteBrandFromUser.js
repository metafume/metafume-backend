const _ = require('lodash');
const User = require('../models/User');

exports.pickFavoriteBrandFromUser = async () => {
  try {
    const users = await User.find().lean();
    const receivers = [];

    users.forEach(user => {
      if (user.isSubscribed) {
        const keyword =
          user.favoriteBrand[_.random(0, user.favoriteBrand.length - 1)];

          receivers.push({
          email: user.email,
          keyword,
        });
      }
    });

    return receivers;
  } catch (err) {
    console.log(err);
  }
};
