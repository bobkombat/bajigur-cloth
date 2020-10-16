const router = require('express').Router();
const AdminUserController = require('../controllers/adminUserController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.post('/login', AdminUserController.login);

router.use(authentication, authorization);

// router.get('/users', AdminUserController.viewAll);
// router.get('/users/:id', AdminUserController.viewOne);

module.exports = router;
