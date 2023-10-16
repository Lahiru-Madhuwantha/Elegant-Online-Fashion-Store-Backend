const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const OrderModel = require('../model/order');


exports.create = async (req, res, next) => {
  const {
    buyer,
    product,
    quantity,
    address,
    description,
  } = req.body;

  try {
    if(!buyer || !product || !quantity || !address) {
      throw createHttpError(400,'Please provide all the required fields')
    }

  const buyerId = mongoose.Types.ObjectId(buyer);
  const productId = mongoose.Types.ObjectId(product);
    const order = new OrderModel({
      buyer: buyerId,
      product: productId,
      quantity,
      total: quantity * product.price,
      date: Date.now(),
      orderStatus: 'pending',
      address,
      description,
    });
    const result = await order.save();
    res.status(201).send(result);
  } catch (error) {
      next(error);
  }
}

exports.getOrdersByBuyer = async (req, res, next) => {
  const buyerId = req.params.id;
  try {
    const orders = await OrderModel.find({buyer: buyerId}).populate('product').populate('buyer').exec();
    res.send(orders);
  } catch (error) {
    next(error);
  }
}