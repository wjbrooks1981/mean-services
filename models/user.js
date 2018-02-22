var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  created_at: { type: Date, default: Date.now }
});

mongoose.model("User", userSchema);
