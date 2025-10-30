/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.on('/Mackenzie').render('pages/mackenzie')
router.on('/template-areas').render('pages/template_areas')

// validations links wow
router.on('/validador').render('pages/')
router.on('/testingnewvalid').render('pages/validation')
