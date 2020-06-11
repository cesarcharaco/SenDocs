'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User")
const Role = use("App/Models/Role")

class VerifyPermission {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next, properties) {
    // call next to advance the request
    let user = await auth.getUser()
    let permission = properties[0]
    let found = false

    let userRoles = (await Role.whereIn('id', user.roles).fetch()).toJSON()

    for (let i in userRoles) {
      for (let j in userRoles[i].permissions) {
        if (userRoles[i].permissions[j] == permission) {
          found = true
          break
        }
      }
    }

    if (!found) {
      response.status(403).send('Usuario no autorizado a esta funcionalidad')
      return
    }

    await next()

  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = VerifyPermission
