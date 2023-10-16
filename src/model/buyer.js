const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buyerSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  
});
const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;