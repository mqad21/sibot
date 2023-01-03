const { Controller } = require('pepesan');
const config = require('../config.json');
const { format } = require('../utils/helpers');

module.exports = class GuideController extends Controller {

    async index() {
        const { guide1, guide2 } = config.messages;
        return [format(guide1), guide2];
    }

}