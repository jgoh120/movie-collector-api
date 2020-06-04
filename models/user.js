var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    organisation: {
        type: [String]
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: number
    }
});

module.exports = mongoose.model('User', UserSchema);