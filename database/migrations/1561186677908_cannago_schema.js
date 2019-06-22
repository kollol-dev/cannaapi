'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CannagoSchema extends Schema {
  up () {
    this.create('cannagos', (table) => {
      table.increments()
      table.integer('userId')
      table.string('medicalCannabis')
      table.string('medicalCannabisExpiration')
      table.timestamps()
    })
  }

  down () {
    this.drop('cannagos')
  }
}

module.exports = CannagoSchema
