var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.comment('Comment');


router.get('/posts', function(req, res, next){
  Post.find(function(err, posts){
    if (err ) { next(err);}
    res.json(posts);
  })
});


module.exports = router;
