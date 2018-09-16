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
  Route.resource('users', 'UserController').apiOnly()
  Route.resource('achievements', 'AchievementController').apiOnly()
  Route.resource('unit', 'UnitController').apiOnly()
  Route.resource('evaluation', 'EvaluationController').apiOnly()
  Route.resource('evidence', 'EvidenceController').apiOnly()
})
  .formats(['json'])
  .prefix('api')

Route.any('*', 'NuxtController.render')
