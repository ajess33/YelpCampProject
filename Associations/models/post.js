const mongoose = require('mongoose');

// POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// turn Schema into a model
module.exports = mongoose.model('Post', postSchema);
