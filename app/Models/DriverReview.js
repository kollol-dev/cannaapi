'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DriverReview extends Model {
    
   
    driver () {
        return this.belongsTo('App/Models/Cannadrive', 'driverId', 'id')
    }
    user () {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
}

module.exports = DriverReview
