'use strict'

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
const Archivo = use("App/Models/Archivo")
const User = use("App/Models/User")
const Moment = require("moment")
const Storage = use('App/Functions/Storage')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  async upload({ request, auth, response }) {
    const profilePic = request.file('files', {
      size: '1024mb'
    })
    const idUser = ((await auth.getUser()).toJSON())._id
    const validateStorage = await Storage.getStorage(idUser, profilePic.size, false)
    if (!validateStorage.error) {
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      const date = new Date().getTime()
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: date + '-' + idUser + '-' + dat.name + '-' + dat.label + '.' + profilePic.extname,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      const data = { name: profilePic.fileName }
      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        dat.idUser = idUser
        dat.archiveName = data.name
        dat.status = 0 // creado
        dat.fileSize = profilePic.size
        let expirate = Moment(dat.expiration).format()
        let formatt = Moment(expirate).utc().toDate()
        dat.expiration = formatt
        const archivo = await Archivo.create(dat)
      }
      return data
    } else if (validateStorage.error) { response.send(validateStorage) }
  }
  async getFile({
    params,
    response
  }) {
    const fileName = params.filename
    return fileName
    response.download(Helpers.appRoot('storage/uploads') + `/${fileName}`)
  }

  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new upload.
   * GET uploads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new upload.
   * POST uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {}

  /**
   * Display a single upload.
   * GET uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing upload.
   * GET uploads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update upload details.
   * PUT or PATCH uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a upload with id.
   * DELETE uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}

  async uploadProfileImage ({ auth, request }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    const profilePic = request.file('files', {
      types: ['image'],
      size: '20mb'
    })

    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    console.log(dat, 'datttttttttt')
    if (Helpers.appRoot('storage/uploads')) {
      await profilePic.move(Helpers.appRoot('storage/uploads'), {
        name: idUser + '.' + profilePic.extname,
        overwrite: true
      })
    } else {
      mkdirp.sync(`${__dirname}/storage/Excel`)
    }
    const data = {
      name: profilePic.fileName
    }
    if (!profilePic.moved()) {
      return profilePic.error()
    } else {
      let user = await User.find(idUser)
      user.img_name = data.name
      await user.save()
    }
    return data
  }

  async getFileByDirectory ({ params, response, request }) {
    //const dir = params.dir.split('-').join('/')
    response.download(Helpers.appRoot('storage/uploads') + `/${params.dir}`)
  }


}

module.exports = UploadController
