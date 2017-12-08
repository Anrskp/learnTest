'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));

/*
 todo : split up into seperate test user/post.
        and figure out how to run sub directories in test folder
        to make unit / intergration tests */


let testUser = {
  username: "mockUser",
  email: "a@valid.email",
  password: "password"
};

let testPost = {
  username: "mockUser",
  post: "mockPost",
  date: new Date()
  //lastEdit: new Date()
};

describe('User http routes', function() {

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

describe('Post http routes', function() {

  it('Should add a new user to the database', () => {
    return chai.request(app)
    .post('/posts/post')
    .send(testPost)
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      assert.equal(res.body.succes, true);
    });
  });
});
