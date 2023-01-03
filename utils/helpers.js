const config = require("../config.json")
const stringTemplate = require("string-template")

exports.format = (str, data = {}) => {
    data = { ...data, ...config.variables }
    return stringTemplate(str, data)
}