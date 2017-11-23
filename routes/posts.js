const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const config = require('../config/database');

// new post
router.post('/post', (req, res, next) => {
  let newPost = new Post ({
    username: req.body.username,
    post: req.body.post,
    date: req.body.date,
    lastEdit: req.body.lastEdit
  });

  Post.addPost(newPost, (err, post) => {
    if(err) {
      res.json({succes: false, msg:'Failed to register post'});
    } else {
      res.json({succes: true, msg:'Post registered'});
    }
  });

});

module.exports = router;
