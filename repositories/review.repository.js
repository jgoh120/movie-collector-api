var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movies'
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users'
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reviews', reviewSchema);