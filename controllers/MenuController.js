const { Controller, Response } = require("pepesan");
const config = require("../config.json");
const { format } = require("../utils/helpers");
const Sheet = require("../utils/Sheet");

module.exports = class MenuController extends Controller {

    subject = Sheet.getMetadata("Judul Materi")
    ki = Sheet.getMetadata("Kompetensi Inti")
    kd = Sheet.getMetadata("Kompetensi Dasar")
    quiz = Sheet.getMetadata("Soal")

    async index() {
        const { menu: menuMessage } = config.messages
        return this.getMenuMessage(format(menuMessage, { subject: this.subject }))
    }

    async getMenuMessage(text = " ") {
        const { kikd, subject: subjectMenu, quiz, about, menu } = config.menu
        const list = [kikd, subjectMenu, quiz, about].map(it => ({ text: it, description: "" }))
        return Response.list.fromArrayOfArrayOfObject([menu], [list], menu, "", text)
    }

    async getMenuButton(message = " ") {
        return Response.button.fromArrayOfString([config.menu.menu], message)
    }

    async getMenuAndHelpButton(message = " ") {
        return Response.button.fromArrayOfString([config.menu.menu, config.menu.help], message)
    }


    async sendKikd() {
        const { kikd: kikdMessage } = config.messages
        const message = format(kikdMessage, { subject: this.subject, ki: this.ki, kd: this.kd })
        return this.getMenuButton(message)
    }

    async sendSubject() {
        const { subject: subjectMessage } = config.messages
        const headings = Sheet.getHeadings()
        const subjectMenu = Response.list.fromArrayOfArrayOfObject([this.subject], [headings], config.messages.seeContent, "", format(subjectMessage, { subject: this.subject }))
        await this.reply(subjectMenu)
        return this.getMenuButton()
    }

    async sendSubSubject(request, index) {
        const { subsubject: subSubjectMessage } = config.messages
        const content = Sheet.getContents()[index]
        const subheadings = Sheet.getSubHeadings(index)
        const subSubjectMenu = Response.list.fromArrayOfArrayOfObject([content.title], [subheadings], config.messages.seeSubContent, "", format(subSubjectMessage, { title: content.title }))
        await this.reply(subSubjectMenu)
        return this.getMenuAndHelpButton()
    }

    async sendContent(request, headingIndex, subHeadingIndex) {
        const content = Sheet.getContent(headingIndex, subHeadingIndex)
        const message = `*${content.subtitle.toUpperCase()}*\n\n${content.content}`
        const menuMessage = this.getMenuMessage()
        await this.reply(message)
        return Response.button.fromArrayOfString(["Menu"])
    }

    async sendQuiz() {
        const { quiz: quizMessage } = config.messages
        const menuMessage = this.getMenuMessage()
        await this.reply(format(quizMessage, { subject: this.subject, quiz: this.quiz }))
        return menuMessage
    }

    async sendAbout() {

    }

}