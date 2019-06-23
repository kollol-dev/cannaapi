'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CurtSchema extends Schema {
  up () {
    this.create('curts', (table) => {
      table.increments()
      table.integer('userId')
      table.integer('itemId')
      table.integer('quantity')
      table.timestamps()
    })
  }

  down () {
    this.drop('curts')
  }
}

module.exports = CurtSchema
