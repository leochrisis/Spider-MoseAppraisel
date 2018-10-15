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
  Route.put('change-password', 'UserController.changePassword')
  Route.get('sponsor-achivements/:id', 'UserController.sponsorAchievements')
  Route.get('valuer-achivements/:id', 'UserController.valuerAchivements')
  Route.get('responsible-units/:id', 'UserController.unitAchievements')
  Route.resource('achievements', 'AchievementController').apiOnly()
  Route.resource('units', 'UnitController').apiOnly()
  Route.resource('evaluations', 'EvaluationController').apiOnly()
  Route.resource('evidences-font', 'EvidenceFontController').apiOnly()
  Route.resource('profiles', 'ProfileController').apiOnly()
  Route.get('roles', 'UserProfileController.index')
  Route.post('roles', 'UserProfileController.store')
  Route.post('login', 'SessionController.login')
  Route.post('logout', 'SessionController.logout')
  Route.get('ids', 'UserController.ids')
  Route.get('evidences', 'EvidenceController')
  Route.get('test/:id', 'EvaluationController.unitId')
  Route.get('teams', 'TeamController.index')
})
  .formats(['json'])
  .prefix('api')

Route.any('*', 'NuxtController.render')
