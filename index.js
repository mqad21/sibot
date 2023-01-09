global.__basedir = __dirname
require('dotenv').config({ path: './.env' });

const Pepesan = require('pepesan');
const router = require('./router');
const Sheet = require('./utils/Sheet');
const { ALLOWED_NUMBERS } = process.env

const client = Pepesan.init(router, {
    browserName: 'SIBOT',
    allowedNumbers: ALLOWED_NUMBERS.split(','),
    sessionPath: './session',
    db: {
        dialect: 'sqlite',
        path: 'data.sqlite',
        timezone: '+00:00'
    },
    models: []
});

(async () => {
    Sheet.init()
    await client.connect();
})();