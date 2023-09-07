const { Router } = require('express');
const imageRouter = require('./image');

const router = Router();

router.use(imageRouter); // /login, /logout, /register

module.exports = router;
