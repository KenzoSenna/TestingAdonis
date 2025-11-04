/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
// const UsersController = () => import ('#controllers/users_controller')
const UsersController = () => import ('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
router.resource('user', UsersController).apiOnly()

router.group(() => {
  router.resource('user', UsersController)}).use(middleware.auth())