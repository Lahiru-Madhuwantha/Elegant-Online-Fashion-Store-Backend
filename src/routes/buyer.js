const express = require('express');
const router = express.Router();
const ByerController = require('../controllers/buyer');

router.post('/',ByerController.register)

module.exports= router;