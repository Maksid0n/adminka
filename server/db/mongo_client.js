'use strict'
const Initializer = require('./initializer.js');

class MongoClient {
    constructor(url) {
        const init = new Initializer(url);
    
        //Including collections to the class
        //this.User = init.User;
    }

    //Initialazing methods to work with DB  dirrectly
    // getUserById(id, cb) {
    //     this.User.findById(id, (err, result) => {
    //         if (err) return console.error(err);
    //         cb(result);
    //     });
    // }
}

module.exports = MongoClient;