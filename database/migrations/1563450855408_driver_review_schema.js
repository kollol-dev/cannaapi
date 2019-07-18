'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DriverReviewSchema extends Schema {
  up () {
    this.create('driver_reviews', (table) => {
      table.increments()
      table.integer('userId')
      table.integer('driverId')
      table.integer('ratring')
      table.string('content')
      table.timestamps()
    })
  }

  down () {
    this.drop('driver_reviews')
  }
}

module.exports = DriverReviewSchema
