'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Item extends Model {
    tags () {
        return this.hasMany('App/Models/ItemTag', 'id', 'itemId')
    }
    reviews () {
        return this.hasMany('App/Models/ItemReview', 'id', 'itemId')
    }
    store () {
        return this.belongsTo('App/Models/Cannagrow', 'growId', 'id')
    }
    user () {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
    avgRating () {
        return this.hasOne('App/Models/ItemReview', 'id', 'itemId').select('itemId', Database.raw('cast(AVG(rating) as decimal(10,2)) AS averageRating')).groupBy('itemId')
      }
}

module.exports = Item
