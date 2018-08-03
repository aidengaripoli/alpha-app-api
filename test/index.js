const app = require('../src/app.js')

describe('tests', function () {
  before(function (done) {
    console.log('TEST: WAITING FOR APP...')
    app.on('ready', done)
  })

  describe('/user', function () {
    console.log('TEST: APP READY, STARTING TESTS...')

    const tests = require('./user.spec')

    it('should create a user and return a token', tests.register)
  })
})
