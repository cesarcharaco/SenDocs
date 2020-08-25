"use strict";

const User = use("App/Models/User")
const Payment = use("App/Models/Payment")
const Role = use("App/Models/Role")
const Email = use('App/Functions/Email')
const Storage = use('App/Functions/Storage')
const Mail = use('Mail') // Adonis' mail
const Helpers = use('Helpers')
var randomize = require('randomatic');

const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto'); // crypto
const { getStorage } = require('../../Functions/Storage');
const {
  validate
} = use("Validator")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getInfoPlan({ response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const info = await Storage.getStorageBalance(idUser)
    response.send(info)
  }

  async assignPlan({ request, response, params }) {
    let user = await User.find(params.idUser)
    let body = request.all()
    user.plan = body
    await user.save()
    response.send(user)
  }

  async index({ request, response, view }) {
    let users = (await User.all()).toJSON();
    for (let j in users) {
      let element = users[j]
      let create = element.created_at
      users[j].created_at = moment(create).format('DD/MM/YYYY HH:mm')
    }
    response.send(users);
  }

  async forgotPassword({ request, response }) {
    const rule = {
      email: 'required'
    }
    let requestAll = request.all()
    const validation = await validate(requestAll, rule)
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      const user = await User.findByOrFail('email', requestAll.email)
      user.codeForgot = randomize('0', 6)
      await Email.sendMail(requestAll.email, 'Cambio de Contraseña', 'Su codigo para cambiar su contraseña es ' + user.codeForgot + ' ,Ingrese este codigo en la aplicacion para poder acceder al cambio de contraseña para iniciar sesion en thot20')
      await user.save()
      response.send({message: 'Se envio un codigo a su email', error: false})
    } else {
      response.send({
        message: 'Correo Inexistente!',
        error: true
      })
    }
  }

  async verifyCode({ request, response }) {
    const rule = {
      code: 'required',
      email: 'required'
    }
    let requestAll = request.all()
    const validation = await validate(requestAll, rule)
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      const user = await User.findByOrFail('email', requestAll.email)
      if (user.codeForgot == requestAll.code) {
        user.codeForgot = ''
        await user.save()
        response.send({message: 'El Codigo Ingresado Es Valido, ya puede proceder a cambiar su contraseña', error: false})
      } else {
        response.send({message: 'El Codigo Ingresado Es Invalido', error: true})
      }
    }
  }

  async changePassword({ request, response }) {
    const rule = {
      newPassword: 'required',
      email: 'required'
    }
    let requestAll = request.all()
    const validation = await validate(requestAll, rule)
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      const user = await User.findByOrFail('email', requestAll.email)
      user.password = requestAll.newPassword
      await user.save()
      response.send({message: 'Contraseña Cambiada con Exito'})
    }
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register({ request, response }) {
    let requestAll = request.all()
    requestAll.role = 1
    const validation = await validate(requestAll, User.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo Existente!'
      }])
    } else {
      let body = request.only(User.fillable)
      body.roles = [requestAll.role]
      delete body.role
      const user = await User.create(body)
      let plan = {}
      plan.id_user = user._id.toString()
      plan.payment = user.plan.price
      await Payment.create(plan)
      Email.sendMail(body.email, 'Bienvenido a thot20', 'A partir de Ahora Formas Parte De Nuestra Plataforma')
      response.send(user)
    }
  }

  async validateEmailExist({ params, response }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo Existente! Eliga Otro'
      }])
    } else { response.send({error: false}) }
  }
  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const user = await User.find(idUser);
    response.send(user);
  }


  async update({ params, request, response, auth }) {
    const rule = {
      email: "required",
      emailRecuperate: "required",
      fullName: "required|string"
    }
    let requestAll = request.all()
    const userAuth = (await auth.getUser()).toJSON()
    const validation = await validate(requestAll, rule)
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let emails = (await User.where({email: requestAll.email}).fetch()).toJSON()
      if (emails.length === 0 || emails[0].email === userAuth.email) {
        const idUser = ((await auth.getUser()).toJSON())._id
        let body = request.only(['email', 'fullName', 'emailRecuperate'])
        await User.where('_id', idUser).update(body)
        response.send({msg: 'datos guardados correctamente'})
      } else {
        response.send({error: true, message: 'Email Existente'})
      }
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async destroy({
    params,
    request,
    response
  }) {
    const {
      id
    } = params;
    const user = await User.find(id);
    await user.delete();
  }

  async login({ auth, request }) {
    const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    const user = (await User.findBy('email', email)).toJSON()
    let isUser = false
    token.roles = user.roles.map(roleMap => {
      if (roleMap === 1) {
        isUser = true
      }
      return roleMap
    })
    let userRoles = await Role.whereIn('id', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2)
      })
    })
    token.fullName = user.fullName
    token.email = user.email

    let data = {}
    data.SD_SESSION_INFO = token
    return data
  }

  showUser({
    auth,
    params
  }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile";
    }
    return auth.user;
  }

    async userData({
      response,
      auth
    }) {
      let user = (await auth.getUser()).toJSON()
      for (let x = 0; x < user.roles.length; x++) {
        var s  = [user]
        const element = user.roles[x];
         if (element == 3) {
          /*  var s = await Country.query().where({
             _id: user.country
           }).with('user').fetch() */
         }
        if (element == 4) {
           var s = await Shop.query().where({
             user_id: user._id
           }).with('user').fetch()
        }
        if (element == 5) {
          var s = await Carrier.query().where({
            user_id: user._id
          }).with('user').fetch()
        }
      }
      response.send(s)
    }


}

module.exports = UserController;
