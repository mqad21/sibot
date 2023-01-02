require('dotenv').config({ path: './.env' });

const Pepesan = require('pepesan');
const router = require('./router');
const { ALLOWED_NUMBERS } = process.env

const client = Pepesan.init(router, {
    browserName: 'SIBOT',
    allowedNumbers: ALLOWED_NUMBERS.split(','),
    sessionPath: './session',
    db: {
        dialect: 'sqlite',
        path: 'data.sqlite'
    },
    models: []
});

(async () => {
    await client.connect();
})();