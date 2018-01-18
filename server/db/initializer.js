'use strict'
const mongoose = require('mongoose');
// Database initializer
class Initializer {
    constructor(url) {
        mongoose.connect(url, {
            useMongoClient: true
        });
        const connection = mongoose.connection;

        //Initialazing schemas
        const userSchema = mongoose.Schema({
            _id: String,
            username: String,
            first_name: String,
            last_name: String,

            genre: {},
            rating: {
                type: Number,
                default: 0
            },
            karma: {
                type: Number,
                default: 0
            },

            current_session: String,
            current_step: Number,

            sessions: [String]
        });    

        const User = mongoose.model('User', userSchema);

        //Listeners
        connection.on('error', console.error.bind(console, 'connection error:'));
        connection.once('open', () => {
            console.log("mLab is connected")
        });

        this.connection = connection;
        this.User = User;
    }
}

module.exports = Initializer;