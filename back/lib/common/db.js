const mysql = require('mysql2')
const config = require('config')

const dbConfig = config.get('db')
const pool = mysql.createPool(dbConfig).promise()

module.exports = pool
