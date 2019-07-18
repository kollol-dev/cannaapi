'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ItemReview extends Model {
    item () {
        return this.belongsTo('App/Models/Item', 'itemId', 'id')
    }
    store () {
        return this.belongsTo('App/Models/Cannagrow', 'growId', 'id')
    }
    user () {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
}

module.exports = ItemReview
