'use strict'

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
const Archivo = use("App/Models/Archivo")
const User = use("App/Models/User")
const Moment = require("moment")
const Storage = use('App/Functions/Storage')
const Encriptacion = use('App/Functions/Encriptacion')
const encrypt = require('node-file-encrypt')


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
        let nombre = dat.name + '-' + dat.label
        nombre = nombre.split(' ').join('-')
        console.log(nombre)
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: date + '-' + idUser + '-' + nombre + '.' + profilePic.extname,
          overwrite: true
        })



      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      const data = { name: profilePic.fileName }
      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let encryptPath = ''
        let encryptFilePath = 'storage/uploads/' + data.name
        let f = new encrypt.FileEncrypt(encryptFilePath)
        f.openSourceFile()
        await f.encrypt('111111')
        encryptPath = f.encryptFilePath

        await fs.unlink(`storage/uploads/${data.name}`, (err) => {
          if (err) throw err;
          console.log('borrado para reemplazar por encryptado');
        })
        dat.idUser = idUser
        dat.archiveName = data.name
        dat.archiveNameEncryp = f.encryptFileName
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
    let filePath = await Encriptacion.decrypt(`storage/uploads/${params.dir}`)
    await response.download(Helpers.appRoot(filePath))
  }

  async deleteFileByDirectory ({ params, response, request }) {
    await fs.unlink(`storage/uploads/${params.dir}`, function() {})
    response.send({message: 'Encriptado'})
  }


}

module.exports = UploadController
