const express = require('express');
const router = express.Router();
const ByerController = require('../controllers/buyer');

router.post('/',ByerController.register)
router.post('/login',ByerController.login)
module.exports= router;