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
    recentSearch: [String],
    myProducts: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
