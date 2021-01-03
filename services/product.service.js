const Product = require('../models/Product');

const getProductById = async productId => {
  return await Product.findOne({ productId });
};

const setProduct = async (id, product) => {
  return await Product.create({
    productId: id,
    brand: product.brand,
    name: product.name,
    imageUrl: product.imageUrl,
  });
};

module.exports = {
  getProductById,
  setProduct,
};
