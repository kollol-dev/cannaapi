'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemTagSchema extends Schema {
  up () {
    this.create('item_tags', (table) => {
      table.increments()
      table.integer('itemId')
      table.string('keyword')
      table.timestamps()
    })
  }

  down () {
    this.drop('item_tags')
  }
}

module.exports = ItemTagSchema
