'use strict';

const Post = require('../models/posts');
const app = require('../app');
const User = require('../models/user');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

describe('Unit testing the user model', () => {

  // Mock user
  var testUser = new User({
    username: "mockUser",
    email: "a@valid.email",
    password: "password"
  });

  let hashedPassword = "";

  // Create new user
  it('Should add a new user with a hashed password to DB' , (done) => {
    User.addUser(testUser, (err, user) => {
      if(err) console.log(err);
      else {
        assert.typeOf(user, 'Object');
        assert.equal(user.username, "mockUser");
        expect(user.password).to.not.equal("password");
      }
      done();
    });
  });

  // Find user
  it('Should find a user with username "mockUser" from DB' , (done) => {
    User.getUserByUsername(testUser.username, (err, user) => {
      if (err) console.log(err);
      else {
        assert.typeOf(user, 'Object');
        assert.equal(user.username, testUser.username);
        assert.equal(user.email, testUser.email);
        hashedPassword = user.password;
      }
      done();
    })
  });

  // Compare password
  it('Should compare passwords and return true' , (done) => {
    User.comparePassword("password", hashedPassword, (err, isMatch) => {
      if (err) console.log(err);
      else {
        assert.equal(isMatch, true);
      }
      done();
    })
  });

  // Delete user
  it('Should delete a user with username "mockUser"' , (done) => {
    User.deleteUserByUsername('mockUser', (err, response) => {
      if(err) console.log(err);
      else {
        let amountDeleted = response.result.n
        expect(amountDeleted).to.be.at.least(1);
      }
      done();
    });
  });

});

describe('Unit testing post model', () => {

  // Mock post
  var testPost = new Post ({
    username: "mockUser",
    post: "mockPost",
    date: new Date()
  });

  var postID = "";

  // Add a new post
  it('Should add a new post to DB' , (done) => {
    Post.addPost(testPost, (err, res) => {
      if (err) console.log(err);
      else {
        assert.typeOf(res, 'Object');
        assert.equal(res.post, testPost.post)
        expect(res).to.not.be.null;

        postID = res._id;
      }
      done();
    })
  });

  // Find post
  it('Should find a post by ID from DB' , (done) => {
    Post.getPostById(postID, (err, res) => {
      if (err) console.log(err);
      else {
        assert.typeOf(res, 'Object');
        assert.equal(res.post, testPost.post)
        expect(res).to.not.be.null;
      }
      done();
    })
  });

  // Get all posts
  it('Should retrive all posts from database' , (done) => {
    Post.getAllPosts((err, posts) => {
      if(err) console.log(err);
      else {
        expect(posts.length).to.be.at.least(1);
        assert.typeOf(posts[0], 'Object');
      }
      done();
    });
  });

  // Delete post
  it('Should delete a post by ID from DB' , (done) => {
    Post.deletePostById(postID, (err, res) => {
      if (err) console.log(err);
      else {
        let amountDeleted = res.result.n;
        assert.equal(amountDeleted, 1);
      }
      done();
    })
  });
});
