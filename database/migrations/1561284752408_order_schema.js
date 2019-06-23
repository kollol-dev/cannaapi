'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('userId')
      table.integer('driverId')
      table.integer('price')
      table.integer('netPrice')
      table.string('commend')
      table.integer('rating')
      table.integer('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
