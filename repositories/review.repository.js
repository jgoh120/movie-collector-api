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
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Users'
        },
        name: {
            type: String
        }
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reviews', reviewSchema);