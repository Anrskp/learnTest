const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const config = require('../config/database');
/*
// Register
router.post('/post', (req, res, next) => {
  let newPost = new Post ({
    username: req.username
  });



    username: {

    post: {

    date: {

    lastEdit : {


    User.addUser(newUser, (err, user) => {
      if(err) {
        res.json({succes: false, msg:'Failed to register user'});
      } else {
        res.json({succes: true, msg:'User registered'});
      }
    });
});

module.exports = router;
*/
