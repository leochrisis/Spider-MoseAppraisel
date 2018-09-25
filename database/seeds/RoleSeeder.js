'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('App/Models/UserProfile')

class RoleSeeder {
  async run () {
    await Role.create({
      userId: '1',
      profileId: '1'
    })

    await Role.create({
      userId: '2',
      profileId: '2'
    })

    await Role.create({
      userId: '3',
      profileId: '4'
    })
  }
}

module.exports = RoleSeeder
