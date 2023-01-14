const { Controller, Response } = require('pepesan');
const config = require('../config.json');
const { format } = require('../utils/helpers');

module.exports = class IntroController extends Controller {

    async index() {
        const { menu, help, aboutChatbot } = config.menu;
        const { intro } = config.messages;
        return Response.button.fromArrayOfString([aboutChatbot, help, menu], format(intro))
    }

}