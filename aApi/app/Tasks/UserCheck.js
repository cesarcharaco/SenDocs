'use strict'


const Task = use('Task')
const Email = use('App/Functions/Email')
const User = use("App/Models/User")
const Notification = use("App/Models/Notification")
const fs = require('fs')
const moment = require("moment")

async function enviarMail (mail, dias) {
  await Email.sendMail(mail, '¡Aviso!', 'Quedan ' + dias + ' dias para que su cuenta caduque, ingrese a nuestra app y renueve su plan para que no pierda sus archivos almacenados' )
  console.log('Email enviado a: ', mail, 'Dias Restantes: ', dias, 'CUENTA ESTA POR CADUCAR')
}

class UserCheck extends Task {
  static get schedule () {
    return '0 */59 * * * *'
  }

  async handle () {
    let actual = moment()
    let users = (await User.all()).toJSON()
    for (const element of users) {
      if (element.email !== 'sadmin@sendocs.com') {
        console.log(element.email)
        let creacionAddYear = moment(element.plan.created_at).add(1, 'year')
        let diasRestantes = moment(creacionAddYear).diff(moment(), 'days')
        console.log(diasRestantes, 'dias')
        let diasNotificacion = {
          days: [
            { send: false, days: 30 }, // 30 dias
            { send: false, days: 15 }, // 15 dias
            { send: false, days: 5 }, // 5 dias
            { send: false, days: 4 }, // 4 dias
            { send: false, days: 3 }, // 3 dias
            { send: false, days: 2 }, // 2 dias
            { send: false, days: 1 } // 1 dias
          ],
          seen: false,
          title: '!Urgente!',
          idUser: element._id
        }
        for (let i in diasNotificacion.days) {
          let diasNoti = diasNotificacion.days[i]
          if (diasNoti.days === diasRestantes) {
            diasNotificacion.message = `A tu cuenta le quedan ${diasRestantes} dias para que caduque, por favor renueve su cuenta para no perder sus archivos`
            diasNotificacion.days[i].send = true
            enviarMail(element.email, diasRestantes)
            await Notification.create(diasNotificacion)
            console.log('ENVIO NOTIFICACION')
          }
        }

      }
    }


  }
}

module.exports = UserCheck
