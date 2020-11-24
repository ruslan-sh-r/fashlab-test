const express = require('express')
const cors = require('cors')
const config = require('config')
const invoices = require('./routes/invoices')

const app = express()
const port = config.get('port')

// base setup
app.use(cors())
app.get('/ping', (req, res) => {
  res.send('pong')
})

// api definition
app.use('/api/invoices', invoices)

// default error handler
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500)
  res.json({
    message: `Error occurred. ${err.message}`,
    error: err
  })
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
