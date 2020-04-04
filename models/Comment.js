
const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
