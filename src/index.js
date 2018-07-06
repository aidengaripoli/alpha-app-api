const express = require('express')
const morgan = require('morgan')

const PORT = process.env.PORT || 8080

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', { skip: (req, res) => res.statusCode < 400 }))
} else if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Alpha API'
  })
})

app.get('/health', (req, res) => {
  res.status(200).end()
})

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not Found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err)
})

const server = app.listen(PORT, () => console.log(`API listening on ${PORT}`))

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString())
  shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString())
  shutdown()
})

// shut down server
function shutdown () {
  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err)
      process.exitCode = 1
    }
    process.exit()
  })
}

module.exports = app
