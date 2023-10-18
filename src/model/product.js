const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive']
  },
  description:{
    type: String,
    required: true
  },
  image : {
    type: String,
    required: true
  },
  rating : {
    type: Number,
    required: true,
    min: [0, 'Rating must be positive']
  
  }
  });

  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;
