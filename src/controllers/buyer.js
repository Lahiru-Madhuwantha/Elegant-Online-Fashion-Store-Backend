const BuyerModel = require('../model/buyer')
const createHttpError = require('http-errors')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.login = async(req, res, next)=>{
  const email = req.body.email
  const password = req.body.password

  try {
    if(!email || !password) {
      throw createHttpError(400,'All fields required')
    }

    const buyer = await BuyerModel.findOne({email: email}).exec();
    if(!buyer) {
      throw createHttpError(400,'User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, buyer.password);
    if(!isPasswordValid) {
      throw createHttpError(400,'Invalid Password')
    }

    const user = await BuyerModel.findOne({email: email}).exec();
    const token = jwt.sign({
        user_id: user._id,
        email: user.email,
    },
    process.env.JWT_TOKEN_KEY,
    {
        expiresIn: "8h",
    }

    )

    user.token = token;
    
    const result = await user.save();
    res.status(200).send(result);
  } catch (error) {
    next(error)
  }
}

exports.register =async(req, res, next)=>{
  
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    try {
      if(!email || !password || !phone || !name ) {
        //throw createHttpError(400,'All things required')
        console.log('All things required');
      }
      let buyer = await BuyerModel.findOne({email: email});
      if(buyer) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      buyer = new BuyerModel({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone
      })
  
      const result = await buyer.save();
      res.status(201).send(result);
  
    } catch (error) {
        next(error)
    }
  }
