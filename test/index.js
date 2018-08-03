const app = require('../src/app.js')

describe('tests', function () {
  before(function (done) {
    app.on('ready', done)
  })

  describe('/user', function () {
    const tests = require('./user.spec')

    it('should create a user and return a token', tests.register)
  })
})
