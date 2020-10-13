const router = require('express').Router();
const UserController = require('../controllers/userController.js');
// const authentication = require('../middlewares/authentication.js');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
