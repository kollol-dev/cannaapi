'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DispensarySchema extends Schema {
  up () {
    this.create('dispensaries', (table) => {
      table.increments()
      table.string('name')
      table.string('yearlyRevenue')
      table.string('license')
      table.string('licenseType')
      table.string('ownerNameFirst')
      table.string('ownerNameLast')
      table.boolean('deliver')
      table.boolean('sharingInventory')
      table.boolean('RecreationalOrMedicinal')
      table.timestamps()
    })
  }

  down () {
    this.drop('dispensaries')
  }
}

module.exports = DispensarySchema
