const fs = require('fs').promises
const csv = require('csv-parse')
const dayjs = require('dayjs')

const invoicesRepo = require('../repositories/invoicesRepository')

const parseOptions = {
  columns: false,
  skip_empty_lines: true,
  skip_lines_with_error: true
}

class InvoicesBLL {
  async get () {
    return await invoicesRepo.get()
  }

  async processFile (filePath) {
    const content = await fs.readFile(filePath, 'utf8')
    const { records, validationErrors } = await parse(content, parseOptions)
    const saveErrors = await saveInvoices(records)
    validationErrors.push(...saveErrors)
    return { validationErrors }
  }
}

const parse = (input, options) => new Promise((resolve, reject) => {
  const validationErrors = []
  const parser = csv(input, options, (err, records) => {
    if (err) {
      reject(err)
    }
    console.log(validationErrors)
    resolve({ records, validationErrors })
  })
  parser.on('skip', (err) => {
    validationErrors.push(err.message)
  })
})

const saveInvoices = async (records) => {
  const validationErrors = []
  const invoices = records
    .filter(x => {
      const errors = validateInvoice(x)
      errors.length > 0 && validationErrors.push(...errors)
      return errors.length === 0
    })
    .map(parseInvoice)

  if (invoices.length === 0) {
    throw new Error('No any valid rows in the file')
  }
  await invoicesRepo.save(invoices)

  return validationErrors
}

const parseInvoice = (record) => {
  const invoice = {
    IncomingId: record[0],
    Amount: record[1],
    DueDate: new Date(record[2]),
    SellingPrice: 0
  }

  const date = dayjs(invoice.DueDate).add(-30, 'day')
  const now = dayjs()
  if (now < invoice.DueDate) {
    const coefficient = now < date ? 0.5 : 0.3
    invoice.SellingPrice = invoice.Amount * coefficient
  }

  return invoice
}

const validateInvoice = (record) => {
  const errors = []

  if (isNaN(record[0])) {
    errors.push(`IncomingId: "${record[0]}" is not a number`)
  }

  if (isNaN(record[1])) {
    errors.push(`Amount ${record[1]} is not a number. Invoice id: ${record[0]}`)
  }

  const date = Date.parse(record[2])
  if (isNaN(date)) {
    errors.push(`Invalid date ${record[2]}. Invoice id: ${record[0]}`)
  }

  return errors
}

module.exports = new InvoicesBLL()
