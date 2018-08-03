const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes')

const database = require('./database')

database.connect().then(() => {
  console.log('APP: MONGODB CONNECTED.. APP EMITTING READY')
  app.emit('ready')
})

require('./models')
require('./passport')

const routes = require('./routes')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', { skip: (req, res) => res.statusCode < BAD_REQUEST }))
} else if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.get('/', (req, res, next) => {
  res.status(OK).json({ message: 'Alpha API' })
})

app.get('/health', (req, res) => {
  res.status(OK).end()
  // TODO: implement an actual healthcheck
})

// Not found handler
app.use((req, res, next) => {
  res.status(NOT_FOUND).json({ message: 'Not Found' })
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || INTERNAL_SERVER_ERROR).json(err)
})

module.exports = app
