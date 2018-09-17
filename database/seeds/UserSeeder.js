'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin'
    })

    await User.create({
      username: 'tester',
      email: 'tester@example.com',
      password: '123456'
    })
  }
}

module.exports = UserSeeder
