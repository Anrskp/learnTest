//'use strict';
const config = require('../config/database')
const User = require('../models/user');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Testing user model functions', function() {

  let testUser = new User({
    username: "mockUser",
    email: "a@valid.email",
    password: "password"
  });

  it('Should add a new user with a hashed password' , function(done) {

    User.addUser(testUser, (err, user) => {
        if(err) throw err;
        else {
          assert.typeOf(user, 'Object');
          assert.equal(user.username, "mockUser");
          expect(user.password).to.not.equal("password");
        }
      done();
    });


  });


  });
