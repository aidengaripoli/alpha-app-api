const expect = require('chai').expect
const request = require('supertest')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const app = require('../src/app.js')

exports.register = function (done) {
  request(app)
    .post('/user/register')
    .send({
      name: 'test',
      email: 'test@example.com',
      password: 'password',
      passwordConfirm: 'password'
    })
    .expect(201)
    .end((err, res) => {
      if (err) done(err)
      expect(res.status).to.equal(201)
      expect(res.body).to.have.property('token')
      expect(res.body.token).to.be.a('String')
      User.countDocuments({}).exec(function (err, count) {
        if (err) done(err)
        expect(count).to.equal(1)
        done()
      })
    })
}
