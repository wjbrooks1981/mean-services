var mongoose = require('mongoose');
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');
router = require('express').Router();

router.route('/')
  .get(function(req, res) {
    User.find({}, {
      password: 0,
      __v: 0
    }, function(err, users) {
      if (err) {
        return res.status(500).send({
          message: "Server Error has occured: " + err
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
    user.save(function(err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(user);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    User.findById(req.params.id, {
      password: 0,
      __v: 0
    }, function(err, user) {
      if (err) {
        return res.status(500).send({
          message: "Server Error" + err
        });
      }
      if (!user) {
        return res.sendStatus(404);
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
      return res.status(200).send({
        message: data
      });
    });
  })

  .put(function(req, res) {
    // User.findById(req.params.id, {
    //   password: 0,
    //   __v: 0
    // }, function(err, user) {
    //   if (err) {
    //     return res.status(500).send({
    //       message: "Server Error" + err
    //     });
    //   }
    //   if (!user) {
    //     return res.status(404);
    //   }
    //
    //   return res.status(200).send(user);
    // });
  });

var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
};
// Generates hash using bCrypt
var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};



module.exports = router;
