const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    isSubscribed: {
     type: Boolean,
     default: false,
    },
    myFavorite: [{
      type: ObjectId,
      ref: 'Product',
    }],
    favoriteAccordsRate: [{
      name: { type: String, required: true },
      rate: { type: Number, default: 0 },
      color: { type: String, required: true },
      _id: false,
    }],
    favoriteBrand: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
