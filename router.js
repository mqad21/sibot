const { Router } = require('pepesan');
const { IntroController, GuideController, MenuController } = require('./controllers');
const config = require('./config.json');

const router = new Router();

router.keyword('hai', [IntroController, 'index']);
router.button('petunjuk', [GuideController, 'index']);
router.button('menu', [MenuController, 'index']);
router.keyword(config.menu.kikd, [MenuController, 'sendKikd'])

module.exports = router;