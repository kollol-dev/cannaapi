'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
class Cannadrive extends Model {
	user() {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
    reviews () {
        return this.hasMany('App/Models/DriverReview', 'id', 'driverId')
    }
    avgRating () {
        return this.hasOne('App/Models/DriverReview', 'id', 'driverId').select('driverId', Database.raw('cast(AVG(rating) as decimal(10,2)) AS averageRating')).groupBy('driverId')
      }
    
}

module.exports = Cannadrive
