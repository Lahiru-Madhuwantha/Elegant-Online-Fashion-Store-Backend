require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const createHttpError = require('http-errors');
const Buyer = require('./model/buyer');
const bcrypt = require('bcrypt');
const BuyerModel = require('./model/buyer');
const BuyerRouter = require('./routes/buyer');
const ProductRouter = require('./routes/products');
const OrderRouter = require('./routes/order');
const fileUpload = require('express-fileupload');

const port = process.env.PORT

app.use(express.json())
app.use(fileUpload());
app.use('/uploads/products',express.static('public/products'))

app.use('/api/v1/buyer', BuyerRouter);
app.use('/api/v1/product', ProductRouter);
app.use('/api/v1/order', OrderRouter);

app.get('/', (req, res,next) => {
  try {
    //res.send('Hello World!')
    //throw new Error ('BROKEN');
    throw createHttpError(404,'BROKEN');
  } catch (error) {
    next(error)
  }
  //res.send('Hello World!')
})

app.use((err,req,res,next) => {
  if(createHttpError.isHttpError(err)) {
      res.status(err.status).
      send({message: err.message})
  } else {
    res.status(500).send({message: err.message})
  }
  res.status(500).send({message: "Error Unknown"})
})


//app.post('/api/v1/buyers',)

module.exports = app;



