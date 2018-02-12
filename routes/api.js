var posts = require('./api/posts')
var users = require('./api/users')
var router = require('express').Router();

//Used for routes that must be authenticated.
function isAuthenticated(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects

  //allow all get request methods for post
  console.log(req);
  if (req.method === "GET" && req.originalUrl === "/api/posts") {
    return next();
  }
  if (req.isAuthenticated()) {
    return next();
  }
  // if the user is not authenticated then redirect him to the login page
  return res.redirect('/#login');
};
router.use('/posts', isAuthenticated, posts);
router.use('/users', isAuthenticated, users);

module.exports = router;
