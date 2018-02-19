var mongoose = require('mongoose');
var User = mongoose.model('User');
router = require('express').Router();

router.route('/')
  //returns all posts
  .get(function(req, res) {
    //Temp solution until DB available
    res.send({
      message: 'TODO: Return All Users'
    });
  })

  .post(function(req, res) {
    //temp until DB
    res.send({
      message: 'TODO: Create a User'
    })
  });

router.route('/:id')
  .get(function(req, res) {
    res.send({
      message: 'TODO: Getting a specific user with id:' + req.params.id
    })
  })

  .delete(function(req, res) {
    res.send({
      message: 'TODO: Delete a user with id: ' + req.params.id
    })
  })

  .put(function(req, res) {
    res.send({
      message: 'TODO: Update the user with id: ' + req.params.id
    })
  });

module.exports = router
