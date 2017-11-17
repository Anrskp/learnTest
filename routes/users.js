const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
      if(err) {
        res.json({succes: false, msg:'Failed to register user'});
      } else {
        res.json({succes: true, msg:'User registerd'});
      }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({succes: false, msg: 'User not found'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 7200 // 2 hours
          });

          res.json({
            succes: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              email: user.email,
              username: user.username
            }
          });
        } else {
          return res.json({succes: false, msg: 'Wrong password'});
        }
      });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user})
});

module.exports = router;
