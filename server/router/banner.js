const router = require('express').Router();
const BannerController = require('../controllers/bannerController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.get('/', BannerController.viewAll);
router.post('/:id', BannerController.viewOne);

router.use(authentication, authorization);

router.post('/:id', BannerController.create);
router.put('/:id', BannerController.update);
router.delete('/:id', BannerController.destroy);

module.exports = router;
