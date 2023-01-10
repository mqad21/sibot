const { Controller, Response } = require("pepesan");
const config = require("../config.json");
const { format } = require("../utils/helpers");
const Sheet = require("../utils/Sheet");
const fs = require("fs")

module.exports = class MenuController extends Controller {

    subject = Sheet.getMetadata("Judul Materi")
    ki = Sheet.getMetadata("Kompetensi Inti")
    kd = Sheet.getMetadata("Kompetensi Dasar")
    indicator = Sheet.getMetadata("Indikator")
    goals = Sheet.getMetadata("Tujuan Pembelajaran")
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
        const message = format(kikdMessage, { subject: this.subject, ki: this.ki, kd: this.kd, goals: this.goals, indicator: this.indicator })
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

    async sendContent(request, index) {
        const content = Sheet.getContent(index)
        const message = content.content.map(it => `*${it.subtitle}*\n${it.content}`)
        await this.reply(message)
        return this.getMenuAndHelpButton()
    }

    async sendQuiz() {
        const { quiz: quizMessage } = config.messages
        await this.reply(format(quizMessage, { subject: this.subject, quiz: this.quiz }))
        return this.getMenuButton()
    }

    async sendAbout() {
        const { about: aboutMessage } = config.messages
        await this.reply([
            format(aboutMessage, { subject: this.subject }),
            Response.image.fromBuffer(fs.readFileSync(__basedir + "/assets/profile.jpg")),
        ])
        return this.getMenuButton()
    }

    async sendAboutChatbot() {
        const { aboutChatbot: aboutMessage } = config.messages
        return format(aboutMessage, { subject: this.subject })
    }

    async sendHelp() {
        return format(config.messages.help)
    }

}