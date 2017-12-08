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

//getAllPosts
router.get('/getAllPosts', passport.authenticate('jwt', {session: false}),(req, res, next) => {
  Post.getAllPosts((err, posts) => {
    if (err)
    {
      res.json({succes: false, msg:'Failed to get posts'});
    }
    else
    {
      res.json({succes: true, posts});
      //res.json(posts);
    };
  });
});
module.exports = router;
