const mongoose = require('mongoose')
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env

const connectionURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.Promise = global.Promise

const options = {
  autoIndex: false,
  reconnectTries: 30,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true
}

const connectWithRetry = () => {
  console.log('DB: CONNECTING TO MONGODB...')
  return mongoose.connect(connectionURI, options)
    .then(() => {
      console.log('DB: MONGODB CONNECTED!')
    })
    .catch(err => {
      console.error('DB: MONGODB ERROR:' + err)
      console.log('DB: RETRYING CONNECTION...')
      setTimeout(connectWithRetry, 3000)
    })
}

module.exports = { connectWithRetry }

// module.exports = function () {
//   mongoose.connect(connectionURI, { useNewUrlParser: true })
//     .then(() => {
//       mongoose.connection.once('open', () => {
//         console.log('CONNECTED TO DATABASE')
//       })
//     })
// }

// module.exports = mongoose.connect(connectionURI, { useNewUrlParser: true })
//   .then(() => console.log('CONNECTED'))
//   .catch(err => console.error(err))
