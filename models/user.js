var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isActive: Boolean,
  isAdmin: Boolean,
  created_by: String,
  created_at: { type: Date, default: Date.now }
});

mongoose.model("User", userSchema);
