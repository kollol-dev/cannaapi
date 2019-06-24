'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserReport extends Model {
    order () {
        return this.belongsTo('App/Models/Order', 'orderId', 'id') 
    }
}

module.exports = UserReport
