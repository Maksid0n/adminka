const credentials = require('../../config');
const db = new(require('./mongo_client'))(credentials.MONGO_URL);
var async = require('async');

module.exports = {
    // Methods for work with database
    // method: (cb) => {
    //     db.method(result => {
    //         cb(result);
    //     });
    // }
};