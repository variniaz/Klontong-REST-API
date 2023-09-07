const { Router } = require('express');
const productController = require('../../../controllers/product');
const upload = require('../../../middlewares/upload');

const router = Router();
const middleware = require('../../../middlewares/index');

router.post('/', middleware.login, upload.array('images', 10), productController.create);
router.put('/:id', middleware.login, productController.update);
router.delete('/:id', middleware.login, productController.delete);

//no auth
router.get('/', productController.index);
router.get('/:id', productController.show);

module.exports = router;
