'use strict'


const Task = use('Task')
const Email = use('App/Functions/Email')
const Archivo = use("App/Models/Archivo")
const Moment = require("moment")
const fs = require('fs')
const moment = require("moment")
const { dir } = require("console")
const Env = use('Env')



class ScheduleIt extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    let actual =  Moment().toDate()
    // console.log(actual, 'Fecha y Hora ACtual')
    let dirWeb = `${Env.get('HOST')}:${Env.get('PORT')}/api/file/`
    let dir_web_production = 'http://sendocs.eichechile.com/api/file/'
    let archivosCaducados = (await Archivo.where({
      expiration : { $lte : actual },
      status: 0
    }).with('userInfo').fetch()).toJSON()
    console.log(archivosCaducados, 'Archivos Caducados')
    if (archivosCaducados.length > 0) {
      for (let i in archivosCaducados) {
        let element = archivosCaducados[i]
        let archivo = await Archivo.find(element._id)
        for (let j in element.emails) {
          console.log(element.archiveName, 'archive name')
          dir_web_production = dir_web_production + element.archiveName
          if (element.fileSize < 5000000) {
            await Email.sendMail(element.emails[j], 'Envio de Archivo', 'Este archivo ha caducado en thot20, por lo cual se le fue enviado a este correo', 'storage/uploads/' + element.archiveName)
            fs.unlink(`storage/uploads/${element.archiveNameEncryp}`, (err) => {
              if (err) throw err;
              console.log( `${element.archiveName} was deleted`);
            })
            archivo.status = 1 // estatus 1 Eliminado y Enviado por correo
          } else {
            await Email.sendMail(element.emails[j], 'Envio de Archivo', 'Este archivo ha caducado en thot20, por lo cual se le fue enviado a este un link ' + dir_web_production)
            archivo.status = 2 // estatus 2 enviado un link de descarga
          }
        }

        await archivo.save()
      }
    }
  }
}

module.exports = ScheduleIt
