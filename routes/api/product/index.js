const { Router } = require("express");
const productRouter = require("./product");

const router = Router();

router.use(productRouter); // /login, /logout, /register

module.exports = router;
