const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    productId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
