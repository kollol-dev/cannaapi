'use strict'

const Schema = use('Schema')

class NotiSchema extends Schema {
  up () {
    this.create('notis', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('title')
      table.string('msg')
      
      table.string('type').default('order')
      table.timestamps()
    })
  }

  down () {
    this.drop('notis')
  }
}

module.exports = NotiSchema
