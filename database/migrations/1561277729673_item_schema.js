'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', (table) => { 
      table.increments()
      table.integer('userId')
      table.integer('growId')
      table.string('img')
      table.string('deliveryFee')
      table.string('price')
      table.string('netPrice')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
