const mongoose = require('mongoose');
const config = require('../config/database');

// Post Schema
const postSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  lastEdit : {
    type: Date,
    required: false
  }
});

const Post = module.exports = mongoose.model('Post', postSchema);

// Methods
// todo : decrypt post
module.exports.getPostByUsername = (username, callback) => {
  const query = {username: username};
  Post.findOne(query, callback);
}

// todo : decrypt post
module.exports.getPostById = (id, callback) => {
  Post.findById(id, callback);
}

// todo : encrypt post
module.exports.addPost = function(newPost, callback) {
      newPost.save(callback);
}
