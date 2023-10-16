const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  buyer:{
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  orederStatus:{
    type: String,
    required: true,
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

