'use strict';

const User = require('../models/user');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mongoose = require('mongoose');
const app = require('../app');
mongoose.Promise = require('bluebird');

describe('User model functions', () => {

  var testUser = new User({
    username: "mockUser",
    email: "a@valid.email",
    password: "password"
  });

  it('Should add a new user with a hashed password' , (done) => {
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
