import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index() {
    const users = await User.query().preload('tasks')
    return users
  }

  async store({ request }: HttpContext) {
    const {name, email, password} = await request.validateUsing(createUserValidator)
    const user = await User.create({ name, email, password })
    return user
  }

  async show({ params }: HttpContext) {

    const user = await User.query().where('id', params.id).preload('tasks')
    return user

  }

  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}