const BuyerModel = require('../model/buyer')
const createHttpError = require('http-errors')
const bcrypt = require('bcrypt'); 

exports.register =async(req, res, next)=>{
  
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    try {
      if(!email || !password || !phone || !name ) {
        throw createHttpError(400,'All things required')
      }
      const isUserAvailable = await BuyerModel.findOne({email: email, phone: phone}).exec();
      if(isUserAvailable) {
        throw createHttpError(400,'User already exists')
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const buyer = new BuyerModel({
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
