var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    movieId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movies'       // collection name
    }    
});

module.exports = mongoose.model('Reviews', reviewSchema);