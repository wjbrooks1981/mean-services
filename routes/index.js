var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message: 'TODO: Send to Index Page'
  });
  // res.render('index', {
  //   title: "Chirp"
  // });
});

module.exports = router;
