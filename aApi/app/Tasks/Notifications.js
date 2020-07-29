'use strict'

const Task = use('Task')
const Email = use('App/Functions/Email')
const Archivo = use("App/Models/Archivo")
const Notification = use("App/Models/Notification")
const moment = require("moment")

async function enviarMail (mail, archiveName, dias) {
  //dias = dias + 1
  await Email.sendMail(mail, 'Aviso', 'Quedan ' + dias + ' dias para que el archivo con el nombre: ' + archiveName + ' Esta por Caducar, puede cambiar su fecha de vencimiento ingresando a la app de thot20 y renovar su archivo, no lo dejes perder una vez terminado la fecha de vencimiento se enviara a lo/s correos ingresados cuando subió el archivo al sistema')
  console.log('Email enviado a: ', mail, 'Dias Restantes: ', dias)
}

async function modificarNotificacion (id, position, dias, edit, file) {
  let notificacion = await Notification.find(id)
  notificacion.days[position].send = true
  notificacion.seen = false
  notificacion.message = diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan ${dias} dias para expirar`
  notificacion.title = '!Atencion!'
  await notificacion.save()
}

class Notifications extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }
  async handle () {
    let archivos = (await Archivo.where({status: 0}).with('userInfo').fetch()).toJSON()
    if (archivos.length > 0) {
      for (let i in archivos) {
        let element = archivos[i]
        var notificacion = (await Notification.where({idFile: element._id}).fetch()).toJSON()
        if (notificacion.length > 0) {
          let diasRestantes = moment().diff(element.expiration, 'days')
          let restante = Math.abs(diasRestantes)
          if (restante === 30 && !notificacion[0].days[0].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, 30)
            await modificarNotificacion(notificacion[0]._id, 0, 30, true, element)

          } else if (restante === 15 && !notificacion[0].days[1].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, 15)
            await modificarNotificacion(notificacion[0]._id, 1, 15, true, element)

          } else if (restante === 5 && !notificacion[0].days[2].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, restante)
            await modificarNotificacion(notificacion[0]._id, 2, 5, true, element)

          } else if (restante === 4 && !notificacion[0].days[3].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, restante)
            await modificarNotificacion(notificacion[0]._id, 3, 4, true, element)

          } else if (restante === 3 && !notificacion[0].days[4].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, restante)
            await modificarNotificacion(notificacion[0]._id, 4, 3, true, element)

          } else if (restante === 2 && !notificacion[0].days[5].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, restante)
            await modificarNotificacion(notificacion[0]._id, 5, 2, true, element)

          } else if (restante === 1 && !notificacion[0].days[6].send) {
            console.log('entro en: ', restante)
            enviarMail(element.userInfo.email, element.name, restante)
            await modificarNotificacion(notificacion[0]._id, 6, 1, true, element)
          }
        } else {
          let diasRestantes = moment().diff(element.expiration, 'days')
          let restante = Math.abs(diasRestantes)
          let diasNotificacion = {
            idFile: element._id,
            days: [
              { send: false }, // 30 dias
              { send: false }, // 15 dias
              { send: false }, // 5 dias
              { send: false }, // 4 dias
              { send: false }, // 3 dias
              { send: false }, // 2 dias
              { send: false } // 1 dias
            ],
            seen: false,
            title: '!Atencion!',
            idUser: element.idUser
          }
          let file = await Archivo.find(element._id)
          if (restante === 30) {
            enviarMail(element.userInfo.email, element.name, 30)
            diasNotificacion.days[0].send = true
            diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 30 dias para expirar`
          } else if (restante === 15) {
            enviarMail(element.userInfo.email, element.name, 15)
            diasNotificacion.days[1].send = true
            diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 15 dias para expirar`
          } else if (restante <= 5) {
            enviarMail(element.userInfo.email, element.name, restante)
            if (restante === 5) {
              diasNotificacion.days[2].send = true
              diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 5 dias para expirar`
            }
            if (restante === 4) {
              diasNotificacion.days[3].send = true
              diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 4 dias para expirar`
            }
            if (restante === 3) {
              diasNotificacion.days[4].send = true
              diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 3 dias para expirar`
            }
            if (restante === 2) {
              diasNotificacion.days[5].send = true
              diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 2 dias para expirar`
            }
            if (restante === 1) {
              diasNotificacion.days[6].send = true
              diasNotificacion.message = `Al archivo "${file.name}" con etiqueta "${file.label}" le faltan 1 dias para expirar`
            }
          }
          await Notification.create(diasNotificacion)
        }
      }
    }
  }
}

module.exports = Notifications
