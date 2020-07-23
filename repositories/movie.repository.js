var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: [String]
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    posterUrl: {
        type: String
    },
    contributorId:{
        type: String
    }
});

module.exports = mongoose.model('Movies', MovieSchema);