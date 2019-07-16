'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cannadrive extends Model {
	 user() {
        return this.belongsTo('App/Models/User', 'userId', 'id')
    }
}

module.exports = Cannadrive
