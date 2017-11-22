/*

'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const app = require('../app');

chai.use(require('chai-http'));

var testUser = {
  username : "testUser",
  email : "test@test.test",
  password : "test"
};

describe('User http routes', function() {

  it('Should add a new user to the database', () => {
    return chai.request(app)
      .post('/users/register')
      .send(testUser)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        assert.equal(res.body.succes, true);
      });
  });
});
*/