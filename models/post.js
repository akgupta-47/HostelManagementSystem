const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
  },
  image: {
    type: [String],
    default: undefined,
  },
  description: {
    type: String,
    required: [true, 'Every post should have a description'],
  },
  org: {
    type: String,
  },
  hostel: {
    type: String,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
