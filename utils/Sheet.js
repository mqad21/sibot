const XLSX = require("xlsx")
const fs = require("fs")

module.exports = class Sheet {

    static FOLDER = '/subject'
    static FILE_PATH = __basedir + this.FOLDER + '/subject.xlsx'
    static OUTPUT_PATH = __basedir + this.FOLDER + '/subject.json'
    static SHEETS = ['Metadata', 'Materi']

    static init() {
        const workbook = XLSX.readFile(this.FILE_PATH, {
            sheets: this.SHEETS,
        })

        const output = {}

        const metadata = XLSX.utils
            .sheet_to_json(workbook.Sheets[this.SHEETS[0]], { header: ["key", "value"] })
            .reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});

        const contents = XLSX.utils
            .sheet_to_json(workbook.Sheets[this.SHEETS[1]], { header: ["no", "title", "subtitle", "content"] })

        const heading = []

        contents.forEach(headingRaw => {
            const { title, subtitle, content } = headingRaw
            const lastHeadingIndex = heading.length - 1

            if (title) {
                heading.push({ title, content: [{ subtitle, content }] })
                return
            }

            if (subtitle) {
                heading[lastHeadingIndex].content.push({ subtitle, content })
                return
            }

            if (content) {
                const lastContentIndex = heading[lastHeadingIndex].content.length - 1
                heading[lastHeadingIndex].content[lastContentIndex].content += `\n\n${content}`
            }
        })
        output.heading = heading
        output.metadata = metadata
        fs.writeFileSync(this.OUTPUT_PATH, JSON.stringify(output))
    }

    static getJson() {
        const jsonString = fs.readFileSync(this.OUTPUT_PATH)
        return JSON.parse(jsonString)
    }

    static getMetadata(key) {
        return this.getJson().metadata[key]
    }

    static getContents() {
        return this.getJson().heading
    }

    static getHeadings() {
        return this.getContents().map((content, index) => ({ text: content.title, value: `heading_${index}` }))
    }

    static getSubHeadings(headingIndex) {
        return this.getContents()[headingIndex].content.map((content, index) => ({ text: content.subtitle, value: `heading_${headingIndex}_subheading_${index}` }))
    }

    static getContent(headingIndex, subHeadingIndex) {
        return this.getContents()[headingIndex].content[subHeadingIndex]
    }

}