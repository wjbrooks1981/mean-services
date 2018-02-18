var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  text: String,
  username: String,
  created_at: { type: Date, default: Date.now }
});

mongoose.model("Post", postSchema);
