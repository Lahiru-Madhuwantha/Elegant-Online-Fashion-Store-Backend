const createHttpError = require('http-errors')
const ProductModel = require('../model/product')
const mongoose = require('mongoose')
const path = require('path')

exports.create = async (req, res,next) => {
  //console.log(req.body);
  const{
    name,
    price,
    description,
    rating,
  } = req.body;
  try {
    const { image } = req.files;
    //console.log(image);
    
    
    let filepath = path.join(__dirname,'/../../../elegant_frontend/src/productimage/',image.name);
    console.log('Filepath:', __dirname, '/../../../elegant_frontend/src/productimage/', image.name);

    //let filepath = path.join(__dirname, '../../public/products/' , image.name);
    console.log(filepath);
     image.mv(filepath);

    let filepathtoUpload = '../productimage/' + image.name ;
//console.log(filepathtoUpload);
    if(!name || !description || !price || !rating) {
      throw createHttpError(400,'All fields are required')
    }

    console.log(filepathtoUpload);
    const product = new ProductModel({
      name,
      price,
      description,
      image: filepathtoUpload,
      rating,
    });
    
    
    const result = await product.save();
    console.log(result);
    res.status(201).json(result);
  }catch (error) {
    
    next(error)
  }
}

exports.update = async(req,res,next) => {
  const productId = req.params.id;
  const{
    name,
    price,
    description,
    rating,
  } = req.body;

  try {
    if(!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400,'Invalid Product Id')
    }
    if(!name || !price || !description) {
      throw createHttpError(400,'All fields are required');
    }
    const{ image } = req.files;
    let filepath
    let filepathtoUpload;

    if(image){
      if(!image.mimetype.startswith('image')) {
        throw createHttpError(400,'Only image are allowed');
      }
      filepath = __dirname + '../../../../public/products/' + image.name;
      image.mv(filepath);
      filepathtoUpload = '/public/products/' + image.name;
    };

    const product = await ProductModel.findById(productId).exec();

    if(!product){
      throw createHttpError(404,'Product not found');
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.rating = rating;
    if(image){
      product.image = filepathtoUpload;
    }
    const result = await product.save();
    res.status(200).send(result);

  } catch (error) {
      next(error)
  }
}

exports.delete= async(req,res,next) => {
  const productId = req.params.id;
  try {
    if(!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400,'Invalid Product Id')
    }
    const result = await ProductModel.findByIdAndDelete(productId).exec();
    if(!result){
      throw createHttpError(404,'Product not found');
    }
    res.status(200).send(result);
  } catch (error) {
      next(error)
  }
}

exports.getAll= async (req,res,next) => {
  try {
    const result = await ProductModel.find().exec();
    res.status(200).send(result);
  } catch (error) {
      next(error)
  }
}

exports.getOne= async (req,res,next) => {
  const Id = req.params.id;
  try {
    if(!mongoose.isValidObjectId(Id)) {
      throw createHttpError(400,'Invalid Product Id')
    }
    const result = await ProductModel.findById(Id).exec();
    if(!result){
      throw createHttpError(404,'Product not found');
    }
    res.status(200).send(result);
  } catch (error) {
      next(error)
  }
}

exports.search = async(req,res,next) => {
  const query = req.query.q;
  try {
    if(!query){
      throw createHttpError(400,'Please provide a search query');
    }
    const result = await ProductModel.find({name: {$regex: query, $options: 'i'}}).exec();

    if(!result) {
      throw createHttpError(404,'Product not found');
    }
    res.status(200).send(result);
  } catch (error) {
      next(error)
  }
}