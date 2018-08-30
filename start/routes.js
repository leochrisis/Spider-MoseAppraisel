'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

// User

Route.group(() => {
  Route.resource('sessions', 'SessionController').apiOnly()
})
  .formats(['json'])
  .prefix('api')

// Route.post('api/sessions', 'SessionController.create')
// Route.post('api/users/create', 'UserController.create')

// // Achievements
// Route.get('api/achievements', 'AchievementController.index')
// Route.post('api/achievement/create', 'AchievementController.create')
// Route.delete('api/achievement/:id', 'AchievementController.delete')

Route.any('*', 'NuxtController.render')
