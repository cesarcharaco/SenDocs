'use strict'

const Task = use('Task')

class ScheduleIt extends Task {
  static get schedule () {
    return '0 */1 * * * *'
  }

  async handle () {
    console.log('probando schedule cron de adonisJS, Cada Minuto')
  }
}

module.exports = ScheduleIt
