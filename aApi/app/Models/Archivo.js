'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Archivo extends Model {
  userInfo() {
    return this.hasOne('App/Models/User', 'idUser', '_id')
  }
}

module.exports = Archivo
