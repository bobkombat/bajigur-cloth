const router = require('express').Router();
const ProductController = require('../controllers/productController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.get('/', ProductController.viewAll);
router.get('/:id', ProductController.viewOne);

router.use(authentication, authorization);

router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

module.exports = router;
