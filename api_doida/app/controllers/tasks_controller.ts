// import type { HttpContext } from '@adonisjs/core/http'
import { createTaskValidator } from "#validators/task"
import type { HttpContext } from "@adonisjs/core/http"
import Task from "#models/task"

export default class TasksController {
    async index({auth}: HttpContext){
        const user = auth.user
        console.log(user)
        await user?.preload('tasks')
        return user?.tasks
    }
    async store({request, auth, response}: HttpContext ){
    try{
        const {title, description} = await request.validateUsing(createTaskValidator)
        const user = auth.user
        await user?.related('tasks').create({
            title,
            description
        })
        return user
    }
    catch (error){
        return response.status(400).json({
            error: 'User not found'
        })
    }

    }
    async show({params, response}: HttpContext){
        try{
            const task = await Task.findByOrFail('id', params.id)
            return task
        }
        catch (error){
            return response.status(400).json({
                error: 'Task not found',
            })
        }
    }
    async update({params, request, response}: HttpContext){
        try{
        const task = await Task.findByOrFail('id', params.id)
        const {title, description, done} = await request.validateUsing(createTaskValidator)
        task.merge({title, description, done})
        await task.save()
        return task
        }
        catch (error){
            return response.status(400).json({error: 'Task not found'})
        }
    }

    async destroy({params, response}: HttpContext){
        try{
            const task = await Task.findByOrFail('id', params.id)
            await task.delete()
            return response.status(203)
        }
        catch (error){
            return response.status(400).json({error: 'Task not foundada'})
        }
    }
}