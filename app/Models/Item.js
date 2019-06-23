'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
    tags () {
        return this.hasMany('App/Models/ItemTag', 'id', 'itemId')
      }
}

module.exports = Item
