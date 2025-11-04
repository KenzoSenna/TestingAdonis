// import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";
import { createSessionValidator } from "#validators/session";
import { HttpContext } from "@adonisjs/core/http";

export default class SessionController {
    async store({ request }: HttpContext){
        const {email, password} = await request.validateUsing(createSessionValidator)
        const user = await User.verifyCredentials(email, password)
        return user
    }
}