var mongoose = require('mongoose');

var MovieStatistics = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movies'
  },
  rating: {
    count: {
      type: Number,
      required: true
    },
    distribution: {
      type: [Number],
      required: true
    },
    average: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MovieStatistics', MovieStatistics);

