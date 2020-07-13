'use strict'


const Task = use('Task')
const Email = use('App/Functions/Email')
const Archivo = use("App/Models/Archivo")
const moment = require("moment")

async function enviarMail (mail, archiveName, dias) {
  dias = dias + 1
  await Email.sendMail(mail, 'Aviso', 'Quedan ' + dias + ' dias para que el archivo con el nombre: ' + archiveName + ' Esta por Caducar, puede cambiar su fecha de vencimiento ingresando a la app de Sendocs y renovar su archivo, no lo dejes perder una vez terminado la fecha de vencimiento se enviara a lo/s correos ingresados cuando subió el archivo al sistema')
  // console.log('Email enviado a: ', mail, 'Dias Restantes: ', dias)
}

class Notifications extends Task {
  static get schedule () {
    return '0 */5 * * * *'
  }

  async handle () {
    let archivos = (await Archivo.where({status: 0}).with('userInfo').fetch()).toJSON()
    if (archivos.length > 0) {
      for (let i in archivos) {
        let element = archivos[i]
        let diasRestantes = moment().diff(element.expiration, 'days')
        let restante = Math.abs(diasRestantes)
        if (restante === 30) {
          enviarMail(element.userInfo.email, element.name, 30)
        } else if (restante === 15) {
          enviarMail(element.userInfo.email, element.name, 15)
        } else if (restante <= 5) {
          enviarMail(element.userInfo.email, element.name, restante)
        }
        // console.log('RESTANTE: ', restante)
      }
    }
  }
}

module.exports = Notifications
