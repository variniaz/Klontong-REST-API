var express = require('express');
var router = express.Router();

const authRouter = require('./auth');
const categoryRouter = require('./category');
const userRouter = require('./users');
const productRouter = require('./product');
const imageRouter = require('./image');

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/image', imageRouter);

module.exports = router;
