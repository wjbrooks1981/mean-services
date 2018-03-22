var mongoose = require('mongoose');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');
router = require('express').Router();

router.route('/')
  .get(function(req, res) {
    User.find({}, {
      username: 1,
      created_at: 1,
      isActive: 1,
      isAdmin: 1,
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
    var user = new User();
    user.username = req.body.username;
    user.password = createHash(req.body.password);
    user.isAdmin = req.body.isAdmin;
    user.isActive = true;
    user.save(function(err, post){
      if(err){
        return res.status(500).send(err);
      }
      return res.json(post);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    User.findById(req.params.id, {
      username: 1,
      created_at: 1,
      isActive: 1,
      isAdmin: 1,
      _id: 1
    }, function(err, user) {
      if (err) {
        return res.status(500).send({
          message: "Server Error" + err
        });
      }
      if (!user) {
        return res.status(404);
      }
      return res.status(200).send(user);
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
      return res.status(204);
    });
  })

  .put(function(req, res) {
    res.send({
      message: 'TODO: Update the user with id: ' + req.params.id
    });
  });

  var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

module.exports = router;
