const { Router } = require("express");
const categoryRouter = require("./category");

const router = Router();

router.use(categoryRouter); // /login, /logout, /register

module.exports = router;
