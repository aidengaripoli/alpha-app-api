const mongoose = require('mongoose')
const { DB_HOST, DB_NAME } = process.env

const connectionURI = `mongodb://${DB_HOST}/${DB_NAME}`

mongoose.Promise = global.Promise
mongoose.connect(connectionURI)
  .then(() => console.log('CONNECTED'))
  .catch(err => console.error(err))
