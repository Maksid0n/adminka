'use strict'
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
};
// Config constants for development or production
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
        VERIFY_TOKEN: process.env.VERIFY_TOKEN,
        LOGIN: process.env.LOGIN,
        PSWD: process.env.PSWD,
        MONGO_URL: process.env.MONGO_URL
    }
} else {
    module.exports = require('./development.json');
}