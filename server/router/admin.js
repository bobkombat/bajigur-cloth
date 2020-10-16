const router = require('express').Router();
const AdminUserController = require('../controllers/adminUserController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.post('/login', AdminUserController.login);

router.use(authentication, authorization);

router.get('/users', AdminUserController.viewAllUser);
router.get('/users/:id', AdminUserController.viewOneUser);
router.get('/users/:id/wishlist', AdminUserController.viewUserWishlist);
router.get('/users/:id/cart', AdminUserController.viewUserCart);
router.get('/users/:id/transaction', AdminUserController.viewUserTransaction);

module.exports = router;
