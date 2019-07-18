'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
class Cannagrow extends Model {

    reviews () {
        return this.hasMany('App/Models/ItemReview', 'id', 'growId')
    }
    user () {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
    avgRating () {
        return this.hasOne('App/Models/ItemReview', 'id', 'growId').select('growId', Database.raw('cast(AVG(rating) as decimal(10,2)) AS averageRating')).groupBy('growId')
      }
    avgPrice () {
        return this.hasOne('App/Models/Item', 'id', 'growId').select('growId', Database.raw('cast(AVG(price) as decimal(10,2)) AS averagePrice')).groupBy('growId')
      }
}

module.exports = Cannagrow
