'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemReviewSchema extends Schema {
  up () {
    this.create('item_reviews', (table) => {
      table.increments()
      table.integer('userId')
      table.integer('itemId')
      table.integer('growerId')
      table.integer('ratring')
      table.string('content')
      table.timestamps()
    })
  }

  down () {
    this.drop('item_reviews')
  }
}

module.exports = ItemReviewSchema
