const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { tokenSecretKey } = require('../../configs');

const User = require('../../models/User');

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
      id: targetUser._id,
      email: targetUser.email,
      name: targetUser.name,
      photoUrl: targetUser.photoUrl,
    }, tokenSecretKey, {
      expiresIn: '7d',
    });

    res.status(201).json({ result: 'ok', token, user: targetUser });
  } catch (err) {
    next(err);
  }
};

const tokenLogin = (req, res, next) => {
  const { token } = req.body;
  if (!token) return next(createError(400));

  try {
    const decodedUser = jwt.verify(token, tokenSecretKey);
    res.status(200).json({ result: 'ok', token, user: decodedUser });
  } catch (err) {
    next(createError(401));
  }
};

module.exports = {
  googleLogin,
  tokenLogin,
};
