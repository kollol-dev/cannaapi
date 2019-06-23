'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
    tags () {
        return this.hasMany('App/Models/ItemTag', 'id', 'itemId')
    }
    store () {
        return this.belongsTo('App/Models/Cannagrow', 'growId', 'id')
    }
    user () {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
}

module.exports = Item
