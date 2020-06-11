'use strict'

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const Shop = use('App/Models/Shop')
const fs = require('fs')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  async upload({
    request
  }) {
    let data = {}
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    var profilePic = request.file('files', {
      types: ['image'],
      size: '2mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: dat.identification + '-' + dat.name + '.' + profilePic.extname,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      data.name = profilePic.fileName

      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    profilePic = request.file('files2', {
      types: ['image'],
      size: '2mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: dat.identification + '- license -' + dat.name + '.' + profilePic.extname,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      data.license = profilePic.fileName
      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    profilePic = request.file('files3', {
      types: ['image'],
      size: '2mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads')) {
        await profilePic.move(Helpers.appRoot('storage/uploads'), {
          name: dat.identification + '- identification -' + dat.name + '.' + profilePic.extname,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      data.identification = profilePic.fileName
      if (!profilePic.moved()) {
        return profilePic.error()
      }
    }
    return data
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

  async uploadShopImage ({ auth, request }) {
    let user = await auth.getUser()
    let shop_id = request.input('shop_id')
    let shop = await Shop.find(shop_id)
    let dir = `storage/uploads/user_${user._id}/shop_${shop_id}/logo`
    let showingDir = `user_${ user._id }-shop_${shop_id}-logo`

    if (!shop) {
      response.unprocessableEntity('El comercio no existe. Vuelva a cargar el formulario')
    }

    const shopImage = request.file('files', {
      types: ['image'],
      size: '2mb'
    })
    let fileName = `${new Date().getTime()}.${shopImage.subtype}`
    await shopImage.move(Helpers.appRoot(dir), {
      name: fileName,
      overwrite: true
    })
    if (!shopImage.moved()) {
      return shopImage.error()
    }
    if (shop.fileName) {
      fs.unlinkSync(Helpers.appRoot(`storage/uploads/${shop.fileName.split('-').join('/')}`))
    }
    shop.fileName = `${showingDir}-${fileName}`
    await shop.save()
    return shop.fileName
  }

  async getFileByDirectory ({ params, response, request }) {
    const dir = params.dir.split('-').join('/')
    response.download(Helpers.appRoot('storage/uploads') + `/${dir}`)
  }


}

module.exports = UploadController
