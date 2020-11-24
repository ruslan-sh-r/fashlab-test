const mysql = require('mysql2')
const config = require('config')
const migration = require('mysql-migrations')
const path = require('path')

const dbConfig = config.get('db')

const connection = mysql.createPool(dbConfig)

migration.init(connection, path.join(__dirname, 'migrations'), function () {
  console.log('finished running migrations')
})
