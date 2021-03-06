const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { tokenSecretKey } = require('../../configs');

exports.verifyToken = (req, res, next) => {
  try {
    const { user_id } = req.params;
    const token = req.headers['x-access-token'];

    const decodedUser = jwt.verify(token, tokenSecretKey);
    if (decodedUser._id !== user_id) return next(createError(403));

    next();
  } catch (err) {
    next(createError(401));
  }
};
