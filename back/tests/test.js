const invoicesBll = require('./../lib/business-layer/invoicesBLL')
const invoicesRepo = require('./../lib/repositories/invoicesRepository')
const path = require('path')

jest.mock('./../lib/repositories/invoicesRepository', () => ({
  save: jest.fn()
}))

test('upload csv', async () => {
  const filePath = path.join(__dirname, 'testInvoices.csv')
  var res = await invoicesBll.processFile(filePath)

  expect(res.validationErrors.length).toBe(2)
  expect(res.validationErrors[0]).toMatch('Invalid Record Length')
  expect(res.validationErrors[1]).toMatch('IncomingId: "B" is not a number')

  expect(invoicesRepo.save.mock.calls.length).toBe(1)
  expect(invoicesRepo.save.mock.calls[0][0].length).toBe(2)
})
