'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Notification = use("App/Models/Notification")
/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController {
  /**
   * Show a list of all notifications.
   * GET notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new notification.
   * GET notifications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new notification.
   * POST notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single notification.
   * GET notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let notifications = (await Notification.where({idUser: idUser}).sort({created_at: -1}).fetch()).toJSON()
    let countNotify = notifications.filter(val => val.seen === false)
    response.send({notifications: notifications, count: countNotify.length})
  }

  async seeAll ({ params, request, response, auth }) {
    const idUser = ((await auth.getUser()).toJSON())._id
    let notifications = (await Notification.where({idUser: idUser, seen: false}).update({
      seen: true
    })).toJSON()
    notifications = (await Notification.where({idUser: idUser}).sort({created_at: -1}).fetch()).toJSON()
    response.send({notifications: notifications, count: 0})
  }

  async update ({ params, response}) {
    let notification = await Notification.where({_id: params.id}).update({seen: true})
    response.send(notification)
  }

  /**
   * Delete a notification with id.
   * DELETE notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = NotificationController
