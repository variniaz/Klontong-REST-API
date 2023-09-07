const { Router } = require('express');
const userController = require('../../../controllers/user');

const router = Router();
const middleware = require('../../../middlewares/index');

router.get('/', userController.findAll);

//with auth
router.get('/profile', middleware.login, userController.showProfile);
router.put('/:id', middleware.login, userController.update);
router.delete('/:id', middleware.login, userController.delete);

module.exports = router;
