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
  Route.resource('users', 'UserController').apiOnly()
  Route.put('change-password', 'UserController.changePassword')
  Route.get('sponsor-achivements/:id', 'UserController.sponsorAchievements')
  Route.get('valuer-achivements/:id', 'UserController.valuerAchivements')
  Route.get('responsible-units/:id', 'UserController.unitAchievements')
  Route.post('per-practice', 'EvidenceController.perPractice')
  Route.post('res-practice', 'ResultController.perPractice')
  Route.get('unit-id/:id', 'TeamController.byUnitId')
  Route.resource('achievements', 'AchievementController').apiOnly()
  Route.resource('units', 'UnitController').apiOnly()
  Route.resource('evaluations', 'EvaluationController').apiOnly()
  Route.resource('evidences-font', 'EvidenceFontController').apiOnly()
  Route.resource('evidences', 'EvidenceController').apiOnly()
  Route.resource('profiles', 'ProfileController').apiOnly()
  Route.resource('results', 'ResultController').apiOnly()
  Route.resource('improvements', 'ImprovementController').apiOnly()
  Route.get('me', 'UserController.me').middleware('auth')
  Route.get('roles', 'UserProfileController.index')
  Route.post('roles', 'UserProfileController.store')
  Route.post('login', 'SessionController.login')
  Route.post('logout', 'SessionController.logout')
  Route.get('ids', 'UserController.ids')
  Route.get('evidences', 'EvidenceController')
  Route.get('test/:id', 'EvaluationController.unitId')
  Route.get('teams', 'TeamController.index')
  Route.resource('member-role', 'MemberRoleController')
})
  .formats(['json'])
  .prefix('api')

Route.any('*', 'NuxtController.render')
