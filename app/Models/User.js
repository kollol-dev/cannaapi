'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
  totalsales () {
    return this.hasOne('App/Models/Order', 'id', 'userId').select('id','userId',  Database.raw('sum(price)   AS gross'),  Database.raw('sum(netPrice)   AS net')  ).groupBy('userId')
  }
  buyerProfile(){
    return this.belongsTo('App/Models/Cannagrow','id','userId')
  }
  profile(){
    return this.belongsTo('App/Models/Cannagrow','id','userId')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  static get hidden () {
    return ['password']
  }
}

module.exports = User
