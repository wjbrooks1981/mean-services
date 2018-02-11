var express = require('express');
var router = express.Router();

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);

router.route('/posts')
    //returns all posts
    .get(function(req, res){
      //Temp solution until DB available
      res.send({ message:  'TODO: Return All Posts'});
    })

    .post(function(req, res){
      //temp until DB
      res.send( {message: 'TODO: Create a Post'})
    });

router.route('/posts/:id')

    .get(function(req, res){
      res.send({ message: 'TODO: Getting a specific post with id:' + req.params.id})
    })

    .delete(function(req, res){
      res.send({ message: 'TODO: Delete a post with id: ' + req.params.id})
    })

    .put(function(req, res){
      res.send( {message: 'TODO: Update the post with id: ' + req.params.id})
    });


module.exports = router;
