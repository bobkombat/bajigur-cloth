const router = require('express').Router();
const AdminUserController = require('../controllers/adminUserController.js');
const BannerController = require('../controllers/bannerController.js');
const ProductController = require('../controllers/ProductController.js');
const TransactionController = require('../controllers/TransactionController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.get('/login', AdminUserController.Login);

router.use(authentication, authorization);

router.get('/users', AdminUserController.viewAll);
router.get('/users/:id', AdminUserController.viewOne);

router.get('')

module.exports = router;
