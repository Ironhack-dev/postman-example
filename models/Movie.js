
const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  description: String,
  imgName: String,
  imgPath: String,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
