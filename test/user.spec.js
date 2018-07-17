const expect = require('chai').expect
const request = require('supertest')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { signToken } = require('../src/helpers')

const app = require('../src/app.js')

describe('/user', function (done) {
  afterEach(function () {
    return mongoose.connection.dropDatabase().catch(console.error)
  })

  describe('POST /register', function () {
    it('should create a user and return a token', function (done) {
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
    })

    it('should fail to create a user and return errors given invalid data', function (done) {
      request(app)
        .post('/user/register')
        .send({
          name: '',
          email: 'not an email',
          password: 'password',
          passwordConfirm: 'something else'
        })
        .expect(422)
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.equal(422)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.be.an('object')
          expect(res.body.errors).to.have.property('name')
          expect(res.body.errors).to.have.property('email')
          expect(res.body.errors).to.have.property('passwordConfirm')
          done()
        })
    })
  })

  describe('POST /login', function () {
    let user = null

    beforeEach('create a user', function () {
      user = new User({ name: 'john', email: 'john@example.com', password: 'password' })
      return user.save()
    })

    it('should login the user and return a token', function (done) {
      request(app)
        .post('/user/login')
        .send({ email: user.email, password: 'password' })
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('String')
          done()
        })
    })

    it('should return an unauthorized response, given invalid credentials', function (done) {
      request(app)
        .post('/user/login')
        .send({ email: user.email, password: 'incorrect' })
        .expect(401)
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.equal(401)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.be.an('object')
          done()
        })
    })
  })

  describe('GET /profile', function () {
    let user = null

    beforeEach('create a user', function () {
      user = new User({ name: 'john', email: 'john@example.com', password: 'password' })
      return user.save()
    })

    it('should return the users profile, given a valid token', function (done) {
      let token = signToken(user)

      request(app)
        .get('/user/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.equal(200)
          expect(res.body).to.have.property('user')
          expect(res.body.user._id).to.equal(user.id)
          done()
        })
    })

    it('should return an unauthorized response, given an invalid token', function (done) {
      request(app)
        .get('/user/profile')
        .set('Authorization', 'Bearer 123invalid-token')
        .expect(401)
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.equal(401)
          expect(res.body).to.have.property('errors')
          expect(res.body.errors).to.be.an('object')
          done()
        })
    })
  })
})
