'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CannagrowSchema extends Schema {
  up () {
    this.create('cannagrows', (table) => { 
      table.increments()
      table.integer('userId')
      table.string('licenseType')
      table.string('growingType')
      table.string('seedType')
      table.string('ownerNameFirst')
      table.string('ownerNameLast')
      table.boolean('deliver')
      table.boolean('sharingInventory')
      table.timestamps()
    })
  }

  down () {
    this.drop('cannagrows')
  }
}

module.exports = CannagrowSchema
