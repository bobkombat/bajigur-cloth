const router = require('express').Router();
const admin = require('./admin.js');
const user = require('./user.js');
const product = require('./product.js');

router.use('/admin', admin);
router.use('/user', user);
router.use('/product', product);

module.exports = router;
