'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));


describe('intergration testing for user routes', function() {

  // Mock user
  let testUser = {
    username: "mockUser",
    email: "a@valid.email",
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
});

  // Authenticate user

  // Get user profile

describe('intergration testing for posts routes', function() {

  // Mock post
  let testPost = {
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

});
