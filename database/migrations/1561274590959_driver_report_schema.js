'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DriverReportSchema extends Schema {
  up () {
    this.create('driver_reports', (table) => {
      table.increments()
      table.integer('userId')
      table.integer('orderId')
      table.integer('name')
      table.integer('email')
      table.integer('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('driver_reports')
  }
}

module.exports = DriverReportSchema
