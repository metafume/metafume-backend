const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Material', materialSchema);
