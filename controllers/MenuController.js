const { Controller, Response } = require("pepesan");
const config = require("../config.json");
const { format } = require("../utils/helpers");

module.exports = class MenuController extends Controller {

    async index() {
        const { menu: menuMessage } = config.messages
        const subject = "Orde Baru"
        return this.getMenuMessage(format(menuMessage, { subject }))
    }

    async getMenuMessage(text = "") {
        const { kikd, subject: subjectMenu, question, about, menu } = config.menu
        const list = [kikd, subjectMenu, question, about].map(it => ({ text: it, description: "" }))
        return Response.list.fromArrayOfArrayOfObject([menu], [list], menu, "", text)
    }

    async sendKikd() {
        const { kikd: kikdMessage } = config.messages
        const subject = "Orde Baru"
        const kikd = "Isi dari KI KD"
        const menuMessage = this.getMenuMessage(" ")
        await this.reply([format(kikdMessage, { subject }), kikd])
        return menuMessage
    }

}