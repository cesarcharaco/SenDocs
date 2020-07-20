'use strict'

const Archivo = use("App/Models/Archivo")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
const { validate } = use("Validator")
const Moment = require("moment")
const Email = use('App/Functions/Email')
const Storage = use('App/Functions/Storage')

const mailgun = require("mailgun-js");
const DOMAIN = "sandbox8fb6864a19f6435d8bd53aac398d265e.mailgun.org";
const mg = mailgun({apiKey: "dbe172f06716896c0001e2cb5813e095-468bde97-68240f12", domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox8fb6864a19f6435d8bd53aac398d265e.mailgun.org>",
	to: "haideemartinez96@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with archivos
 */

class ArchivoController {
  /**
   * Show a list of all archivos.
   * GET archivos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let archivos = (await Archivo.where({idUser: idUser}).sort({created_at: -1}).fetch()).toJSON()
    if (archivos) {
      for (let j in archivos) {
        let expirate = Moment(archivos[j].expiration).toDate()
        let formatt = Moment(expirate).format('DD/MM/YYYY HH:mm')
        archivos[j].expiration = formatt
      }
    }
    response.send(archivos)
  }

  async enviarCorreo ({ request, response, view, auth }) {
    Email.sendMail('haideemartinez96@gmail.com', 'Bienvenido a thor20', 'Formas parte de thor20, Desarrollo por Eiche')
    console.log('algooo')
  }

  /**
   * Render a form to be used for creating a new archivo.
   * GET archivos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new archivo.
   * POST archivos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single archivo.
   * GET archivos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const archivo = await Archivo.find(params.id);
    let expirate = Moment(archivo.expiration).toDate()
    let formatt = Moment(expirate).format('YYYY-MM-DD HH:mm:ss')
    archivo.expiration = formatt
    //response.download(Helpers.appRoot('storage/uploads') + `/${archivo.archiveName}`)
    response.send(archivo);
  }

  /**
   * Render a form to update an existing archivo.
   * GET archivos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update archivo details.
   * PUT or PATCH archivos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    if (params.filet === '0') {

      const profilePic = request.file('files', {
        size: '25mb'
      })
      var fileSize = profilePic.size
      const validateStorage = Storage.getStorate(idUser, profilePic.size, true)
      if (!validateStorage.error) {
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
          return updateData(request, data, true, dat, fileSize)
        }
      } else if (validateStorage.error) { response.send(validateStorage) }
    } else {
      console.log('entro en filet no es 0')
      return updateData(request, null , false, dat, fileSize)
    }
  }

  /**
   * Delete a archivo with id.
   * DELETE archivos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let archivo = await Archivo.find(params.id)
    fs.unlink(`storage/uploads/${archivo.archiveName}`, (err) => {
      if (err) throw err;
      console.log(`'${archivo.archiveName} was deleted por el cliente'`);
    });
    await archivo.delete()
    response.send(archivo)
  }

  async renovate ({ params, request, response }) {
    const rule = {
      expiration: 'required'
    }
    const validation = await validate(request.all(), rule);
    if (!validation.fails()) {
      const body = request.only(["expiration"]);
      const archivo = await Archivo.find(params.id)
      let expirate = Moment(body.expiration).format()
      let formatt = Moment(expirate).utc().toDate()
      archivo.expiration = formatt
      await archivo.save();
      return archivo
    } else {
      return validation.messages();
    }
  }
}

async function updateData (elRequest, data, changeFilename, dat, fileSize) {
  const rule = {
    emails: "required|array",
    // expiration: 'required|string',
    idUser: 'required|string',
    label: 'required|string',
    name: 'required|string'
  }
  const validation = await validate(dat, rule);
  if (!validation.fails()) {
    const body = dat // .only(["emails", "expiration", "idUser", "label", "name", "archiveName" ]);
    let archivo = await Archivo.find(dat._id);
    archivo.name = body.name;
    archivo.archiveName = changeFilename ? data.name : body.archiveName
    if (changeFilename) {
      fs.unlink(`storage/uploads/${body.archiveName}`, (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      });
      archivo.fileSize = fileSize
    }
    archivo.emails = body.emails
    let expirate = Moment(body.expiration).format()
    let formatt = Moment(expirate).utc().toDate()

    archivo.expiration = formatt
    archivo.idUser = body.idUser
    archivo.label = body.label
    archivo.status = 0
    await archivo.save();
    return archivo
  } else {
    return validation.messages();
  }
}

module.exports = ArchivoController
