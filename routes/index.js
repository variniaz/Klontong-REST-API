var express = require('express');
var router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);
router.get('/api', (req, res) => {
  res.sendJson(200, true, 'Welcome to homepage');
});
router.get('/', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/23999493/2s9YBz1uQZ');
});

module.exports = router;
