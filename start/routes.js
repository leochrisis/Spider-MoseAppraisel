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
  Route.get('me', 'UserController.me').middleware('auth')
  Route.resource('users', 'UserController').apiOnly()
  Route.resource('achievements', 'AchievementController').apiOnly()
  Route.resource('units', 'UnitController').apiOnly()
  Route.resource('evaluations', 'EvaluationController').apiOnly()
  Route.resource('evidences', 'EvidenceController').apiOnly()
  Route.resource('profiles', 'ProfileController').apiOnly()
  Route.post('login', 'SessionController.login')
  Route.post('logout', 'SessionController.logout')
})
  .formats(['json'])
  .prefix('api')

Route.any('*', 'NuxtController.render')
