const { Controller, Response } = require('pepesan');
const config = require('../config.json');

module.exports = class IntroController extends Controller {

    async index() {
        const { menu, guide } = config.menu;
        const { intro } = config.messages;
        return Response.button.fromArrayOfString([guide, menu], intro)
    }

}