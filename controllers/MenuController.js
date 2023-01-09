const { Controller, Response } = require("pepesan");
const config = require("../config.json");
const { format } = require("../utils/helpers");
const Sheet = require("../utils/Sheet");

module.exports = class MenuController extends Controller {

    async index() {
        const { menu: menuMessage } = config.messages
        const subject = "Orde Baru"
        return this.getMenuMessage(format(menuMessage, { subject }))
    }

    async getMenuMessage(text = config.messages.seeMenu) {
        const { kikd, subject: subjectMenu, question, about, menu } = config.menu
        const list = [kikd, subjectMenu, question, about].map(it => ({ text: it, description: "" }))
        return Response.list.fromArrayOfArrayOfObject([menu], [list], menu, "", text)
    }

    async sendKikd() {
        const { kikd: kikdMessage } = config.messages
        const subject = Sheet.getMetadata("Judul Materi")
        const kikd = "Isi dari KI KD"
        const menuMessage = this.getMenuMessage()
        await this.reply([format(kikdMessage, { subject }), kikd])
        return menuMessage
    }

    async sendSubject(request) {
        const { subject: subjectMessage } = config.messages
        const subject = Sheet.getMetadata("Judul Materi")
        const headings = Sheet.getHeadings()
        const menuMessage = this.getMenuMessage()
        const subjectMenu = Response.list.fromArrayOfArrayOfObject([subject], [headings], config.messages.seeContent, "", format(subjectMessage, { subject }))
        await this.reply(subjectMenu)
        return menuMessage
    }

    async sendContent(request, index) {
        const content = Sheet.getContent(index)
        console.log(content);
        const menuMessage = this.getMenuMessage()
        await this.reply(JSON.stringify(content))
        return menuMessage
    }

}