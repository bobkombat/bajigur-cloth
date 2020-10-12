const router = require('express').Router();
const admin = require('./admin.js');
const user = require('./user.js');

router.use('/admin', admin);
router.use('/user', user);

module.exports = router;
