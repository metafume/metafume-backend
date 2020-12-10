const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
    myFavorite: Array,
    favoriteAccordsRating: Array,
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
