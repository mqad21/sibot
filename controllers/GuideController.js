const { Controller } = require('pepesan');
const config = require('../config.json');

module.exports = class GuideController extends Controller {

    async index() {
        const { guide1, guide2 } = config.messages;
        return [guide1, guide2];
    }

}