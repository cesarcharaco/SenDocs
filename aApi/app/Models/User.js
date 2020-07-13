'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  userInfo() {
    return this.hasOne('App/Models/User', '_id', 'idUser')
  }
  /* country() {
    return this.hasOne('App/Models/Country', 'country_id', '_id')
  }
  static get hidden() {
    return ['password']
  } */
  static get fillable() {
    return ['email', 'password', 'fullName', 'role']
  }
  static fieldValidationRules(role) {
    const rulesUser = {
      role: 'required|number',
      fullName: "required|string|min:3|max:80",
      email: 'required|email',
      password: 'required|string|min:8|max:256'
    }
    return rulesUser
  }
  static boot() {
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
  tokens() {
    return this.hasMany('App/Models/Token')
  }
  static get objectIDs () { return [ 'country_id','_id', 'city_id' ] }
}

module.exports = User
