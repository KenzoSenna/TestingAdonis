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
  
  async show({ params, response }: HttpContext) {
    try{
      // await de user para encontrar pelos parâmetros correspondentes no findbyorfail
      const user = await User.findByOrFail('id', params.id)
      // await para carregar as tasks junto do retorno do usuário
      await user.load('tasks')
      // const user = await User.query().where('id', params.id).preload('tasks')
      return user

    }
    catch (error){
      // Return no json com statususss do error
      return response.status(400).json({
        error: 'User not found',
        // eu com gracinha
        'Alternativas': 'Desista de tudo'
      })
    }

  }

  async update({ params, request, response }: HttpContext) {

    try{
      const user = await User.findByOrFail('id', params.id)
      // request requerindo que o nome e a senha sejam alterados usando a validação
      const {name, password} = await request.validateUsing(createUserValidator)
      user.merge({ name, password })
      await user.save()
      return user
      
    }
    catch (error){
      return response.status(400).json({
        error: 'User not found',
        'Alternativas': 'contornar esse problema jamais fora uma opção...'
      })

    }

  }

  async destroy({ params, response }: HttpContext) {
  try{
    const user = await User.findByOrFail('id', params.id)
    await user.delete()
    return response.status(203)
  }
  catch (error){
    return response.status(400).json({
      error: 'User not found',
      'Motivations ILC': 'Tente fazer direito da próxima vez. Apague algo que existe.'
    })
  }
  }
}