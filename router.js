const { Router } = require('pepesan');
const { IntroController, GuideController, MenuController } = require('./controllers');
const config = require('./config.json');

const router = new Router();

router.keyword('hai', [IntroController, 'index']);
router.button('petunjuk', [GuideController, 'index']);
router.button('menu', [MenuController, 'index']);
router.keyword(config.menu.kikd, [MenuController, 'sendKikd'])
router.keyword(config.menu.subject, [MenuController, 'sendSubject'])
router.keyword(config.menu.quiz, [MenuController, 'sendQuiz'])
router.keyword(config.menu.about, [MenuController, 'sendAbout'])
router.list("heading_{headingIndex}_subheading_{subHeadingIndex}", [MenuController, 'sendContent'])
router.list("heading_{index}", [MenuController, 'sendSubSubject'])

module.exports = router;