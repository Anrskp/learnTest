'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));

var testToken = ""

describe('intergration testing for user routes', function() {

  // Mock user
  var testUser = {
    username: "mockUser",
    email: "a@valid.email",
    password: "password"
  };

  var testUserlogin = {
    username: "mockUser",
    password: "password"
  };


  // Add a new user
  it('Should add a new user to the database', () => {
    return chai.request(app)
    .post('/users/register')
    .send(testUser)
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      assert.equal(res.body.success, true);
    });
  });

  // Authenticate user
  it('Should authenticate user and return a valid JSON web token', () => {
    return chai.request(app)
    .post('/users/authenticate')
    .send(testUserlogin)
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      assert.equal(res.body.success, true);

      testToken = res.body.token;
    });
  });

  it('Should fail to authenticate a unregistered user', () => {
    return chai.request(app)
    .post('/users/authenticate')
    .send({"username" : "testing",
    "password" : "testing"})
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      assert.equal(res.body.success, false);
      assert.equal(res.body.msg, "User not found")
    });
  });

  // Get user profile
  it('Should retrive the users profile by token', () => {
    return chai.request(app)
    .get('/users/profile')
    .set('authorization', testToken)
    .then(function(res) {
      assert.equal(res.body.user.username, testUser.username)
      assert.equal(res.body.user.email, testUser.email);
    });
  });

  // Get user profile
  it('Should fail to retrive a users profile with invalid token', () => {
    return chai.request(app)
    .get('/users/profile')
    .set('authorization', 'invalidToken')
    .then(function(err, res) {
      // this will fail
    })
    .catch(err => {
      assert.equal(err.response.status, 401)
      assert.equal(err.response.text, 'Unauthorized')
    });
  });

});

describe('intergration testing for posts routes', function() {

  // Mock post
  var testPost = {
    username: "mockUser",
    post: "mockPost",
    date: new Date()
  };


  // Add new post
  it('Should add a new post to the database', () => {
    return chai.request(app)
    .post('/posts/post')
    .send(testPost)
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      assert.equal(res.body.succes, true);
    });
  });


  // Get all posts
  it('Should get all posts from DB', () => {
    return chai.request(app)
    .get('/posts/getAllPosts')
    .set('authorization', testToken)
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      assert.equal(res.body.success, true);
    });
  });


});
