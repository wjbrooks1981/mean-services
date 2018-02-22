var mongoose = require('mongoose');
var User = mongoose.model('User');
router = require('express').Router();

router.route('/')
  .get(function(req, res) {
    User.find({}, {
      username: 1,
      created_at: 1,
      _id: 1
    }, function(err, users) {
      if (err) {
        return res.status(500).send({
          message: "Server Error:" + err
        });
      }
      return res.send(users);
    });
  })

  .post(function(req, res) {
    //temp until DB
    res.send({
      message: 'TODO: Create a User'
    });
  });

router.route('/:id')
  .get(function(req, res) {
    User.findById(req.params.id, {
      username: 1,
      created_at: 1,
      _id: 0
    }, function(err, user) {
      if (err) {
        return res.status(500).send({
          message: "Server Error" + err
        });
      }
      if (!user) {
        return res.send(404);
      }
      return res.send(user);
    });
  })

  .delete(function(req, res) {
    User.deleteOne({
      id: req.params.id
    }, function(err, data) {
      if (err) {
        return res.status(500).send({
          message: "Server Error:" + err
        });
      }
      return res.send(204);
    });
  })

  .put(function(req, res) {
    res.send({
      message: 'TODO: Update the user with id: ' + req.params.id
    });
  });

module.exports = router;
