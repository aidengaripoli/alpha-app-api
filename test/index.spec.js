const expect = require('chai').expect
const request = require('supertest')

const app = require('../src/app.js')

describe('API', function () {
  describe('GET /', function () {
    it('should return basic message', function (done) {
      request(app)
        .get('/')
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.equal(200)
          expect(res.text).to.be.equal(JSON.stringify({
            message: 'Alpha API'
          }))
          done()
        })
    })
  })

  describe('GET /health', function () {
    it('hould return HTTP 200', function (done) {
      request(app)
        .get('/health')
        .end((err, res) => {
          if (err) done(err)
          expect(res.status).to.be.equal(200)
          done()
        })
    })
  })
})
