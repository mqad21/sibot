const { Router } = require('pepesan');
const { IntroController, GuideController, MenuController } = require('./controllers');
const config = require('./config.json');

const router = new Router();

router.keyword(config.messages.hi, [IntroController, 'index']);
router.keyword(config.menu.backToIntro, [IntroController, 'index']);
router.button(config.menu.guide, [GuideController, 'index']);
router.keyword(config.menu.aboutChatbot, [MenuController, 'sendAboutChatbot'])
router.button(config.menu.menu, [MenuController, 'index']);
router.button(config.menu.backToMenu, [MenuController, 'index']);
router.keyword(config.menu.kikd, [MenuController, 'sendKikd'])
router.keyword(config.menu.subject, [MenuController, 'sendSubject'])
router.keyword(config.menu.backToSubject, [MenuController, 'sendSubject'])
router.keyword(config.menu.quiz, [MenuController, 'sendQuiz'])
router.keyword(config.menu.about, [MenuController, 'sendAbout'])
router.keyword(config.menu.help, [MenuController, 'sendHelp'])
router.list("heading_{index}", [MenuController, 'sendContent'])

module.exports = router;