'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionnaireSchema extends Schema {
  up () {
    this.create('questionnaires', (table) => {
      table.increments()
      table.integer('userId')
      table.string('question')
      table.string('answer')
      table.timestamps()
    })
  }

  down () {
    this.drop('questionnaires')
  }
}

module.exports = QuestionnaireSchema
