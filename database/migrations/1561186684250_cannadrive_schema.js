'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CannadriveSchema extends Schema {
  up () {
    this.create('cannadrives', (table) => {
      table.increments()
      table.integer('userId')
      table.string('license')
      table.string('licenseExpiration')
      table.string('carBrand')
      table.string('carModel')
      table.string('carColor')
      table.string('carPlateNumber')
      table.string('carInsurance')
      table.string('codeReferral')
      table.timestamps()
    })
  }

  down () {
    this.drop('cannadrives')
  }
}

module.exports = CannadriveSchema
