const router = require('express').Router();
const UserController = require('../controllers/userController.js');
const CartController = require('../controllers/cartController.js');
const authentication = require('../middlewares/authentication.js');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authentication);

router.get('/cart', CartController.viewAll);
router.post('/cart/:product_id', CartController.create);
router.put('/cart/:product_id', CartController.update);
router.delete('/cart/:cart_id', CartController.destroy);

module.exports = router;
