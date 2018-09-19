'use strict'

const Role = use('App/Models/UserProfile')

class UserProfileController {
  async index () {
    return await Role
    .query()
  }

  async store ({ request }) {
    const data = request.only(['userId', 'profileId'])

    const role = await Role.create(data)

    return role
  }
}

module.exports = UserProfileController
