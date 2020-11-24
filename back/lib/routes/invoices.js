const express = require('express')
const formidable = require('formidable')

const invoicesBll = require('../business-layer/invoicesBLL')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await invoicesBll.get()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/upload', async (req, res, next) => {
  try {
    const { files } = await parseForm(req)
    const result = await invoicesBll.processFile(files.file.path)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

const parseForm = (req) => new Promise((resolve, reject) => {
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    err ? reject(err) : resolve({ fields, files })
  })
})

module.exports = router
