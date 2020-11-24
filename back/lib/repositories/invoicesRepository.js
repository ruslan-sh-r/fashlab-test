const pool = require('../common/db')

class InvoicesRepository {
  async get () {
    const [rows] = await pool.query('select * from invoices')
    return rows
  }

  async save (invoices) {
    const command = 'INSERT INTO invoices(IncomingId, Amount, DueDate, SellingPrice) VALUES ? '
    const values = invoices.map(x => Object.values(x))
    await pool.query(command, [values])
  }
}

module.exports = new InvoicesRepository()
