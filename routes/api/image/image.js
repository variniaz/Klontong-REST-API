const { Router } = require('express');
const imageController = require('../../../controllers/image');

const router = Router();
const middleware = require('../../../middlewares/index');


//with auth
router.get('/', middleware.login, imageController.findAll);
router.get('/:id', middleware.login, imageController.show);
router.put('/:id', middleware.login, imageController.update);
router.delete('/:id', middleware.login, imageController.delete);

module.exports = router;
