const { Controller, Response } = require("pepesan");
const config = require("../config.json");
const { format } = require("../utils/helpers");

module.exports = class MenuController extends Controller {

    async index() {
        const { menu: menuMessage } = config.messages
        const subject = "Orde Baru"
        return this.getMenuMessage(format(menuMessage, { subject }))
    }

    async getMenuMessage(text = " ") {
        const { kikd, subject: subjectMenu, question, about, menu } = config.menu
        const list = [kikd, subjectMenu, question, about].map(it => ({ text: it, description: "" }))
        return Response.list.fromArrayOfArrayOfObject([menu], [list], menu, "", text)
    }

    async sendKikd() {
        const { kikd: kikdMessage } = config.messages
        const subject = "Orde Baru"
        const kikd = "Isi dari KI KD"
        const menuMessage = this.getMenuMessage()
        await this.reply([format(kikdMessage, { subject }), kikd])
        return menuMessage
    }

    async sendSubject() {
        const { subject: subjectMessage } = config.messages
        const subject = "Orde Baru"
        const subjects = [
            {
                text: "Masa Transisi 1966-1967",
                value: "subject_2.1"
            },
            {
                text: "Stabilisasi Politik dan Rehabilitasi Ekonomi",
                value: "subject_2.2"
            },
            {
                text: "Integrasi Timor-Timur",
                value: "subject_2.3"
            },
            {
                text: "Dampak Kebijakan Politik dan Ekonomi Masa Orde Baru",
                value: "subject_2.4"
            }
        ]
        const menuMessage = this.getMenuMessage()
        const subjectMenu = Response.list.fromArrayOfArrayOfObject([subject], [subjects], subject, "", format(subjectMessage, { subject }))
        await this.reply(subjectMenu)
        return menuMessage
    }

}