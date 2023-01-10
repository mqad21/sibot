const { Controller } = require('pepesan');
const config = require('../config.json');
const { format } = require('../utils/helpers');

module.exports = class GuideController extends Controller {

    async index() {
        const { guide } = config.messages;
        return guide
    }

}