'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrowerReportSchema extends Schema {
  up () {
    this.create('grower_reports', (table) => {
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
    this.drop('grower_reports')
  }
}

module.exports = GrowerReportSchema
