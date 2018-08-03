const mongoose = require('mongoose')
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env

const connectionURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.Promise = global.Promise
module.exports = mongoose.connect(connectionURI, { useNewUrlParser: true })
  .then(() => console.log('CONNECTED'))
  .catch(err => console.error(err))
