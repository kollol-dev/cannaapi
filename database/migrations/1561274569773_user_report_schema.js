'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserReportSchema extends Schema {
  up () {
    this.create('user_reports', (table) => {
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
    this.drop('user_reports')
  }
}

module.exports = UserReportSchema
