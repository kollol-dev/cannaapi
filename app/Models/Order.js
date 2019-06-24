'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model { 
    orderdetails () {
        return this.hasMany('App/Models/OrderDetail', 'id', 'orderId') 
    }
}

module.exports = Order
