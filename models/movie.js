const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieTitle: {
    type: String,
    required: true
  },
  movieDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Movie", movieSchema);
