var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  text: String,
  created_by: String,
  created_at: { type: Date, default: Date.now }
});

mongoose.model("Post", postSchema);
