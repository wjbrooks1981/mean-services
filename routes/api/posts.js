var mongoose = require('mongoose');
var Post = mongoose.model('Post');
router = require('express').Router();

router.route('/')
  //returns all posts
  .get(function(req, res) {
    Post.find(function(err, posts){
      if(err){
        return res.status(500).send({ message: 'Function could not complete'});
      }
      return res.send(posts);
    });
  })

  .post(function(req, res) {
    var post = new Post();
    post.text = req.body.text;
    post.created_by = req.body.created_by;
    post.save(function(err, post){
      if(err){
        return res.status(500).send(err);
      }
      return res.json(post);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Post.findById(req.params.id, function(err, post){
      if(err){
        return res.status(500).send({message: "Server Error:" + err});
      }
      if(!post){
        return res.status(404);
      }
      return res.send(post);
    });
  })

  .delete(function(req, res) {
    Post.deleteOne({ '_id': req.params.id}, function(err, post){
      if(err){
        return res.status(500).send({message: "Server Error:" + err});
      }
      if(!post){
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    });
  })

  .put(function(req, res) {
    Post.findById(req.params.id, function(err, post){
      if(err){
        return res.status(500).send({message: "Server Error:" + err});
      }
      if(!post){
        return res.status(404).send();
      }
      post.text = req.body.text;
      post.save(function(err, post){
        if(err){
          return res.status(500).send( {message: "Server Error:" + err});
        }
        return res.status(200).send(post);
      });
    });
  });
module.exports = router;
