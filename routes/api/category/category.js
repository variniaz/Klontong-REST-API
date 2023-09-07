const { Router } = require('express');
const categoryController = require('../../../controllers/category');

const router = Router();
const middleware = require('../../../middlewares/index');

router.post('/', middleware.login, categoryController.create);
router.put('/:id', middleware.login, categoryController.update);
router.delete('/:id', middleware.login, categoryController.delete);

//no auth
router.get('/:id', categoryController.showProductCategory);
router.get('/', categoryController.index);

module.exports = router;
