'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const users = User
      .query()
      .with('profiles')
      .fetch()

    return users
  }

  async me ({ auth, params }) {
    const authenticated = await auth.getUser()
    const user = await User.findOrFail(authenticated.id)
    const profiles = await user.profiles().fetch()

    user.profiles = profiles

    return user
  }

  async store ({ request }) {
    const {username, email, password, profiles} = request.post()

    const user = await User.create({username, email, password})

    if (profiles && profiles.length > 0) {
      await user.profiles().attach(profiles)
    }

    return user
  }

  async show ({ params, response }) {
    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found!' })
    }

    const profiles = await user.profiles().fetch()

    user.profiles = profiles

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)

    const {username, email, profiles} = request.post()

    user.username = username || user.username
    user.email = email || user.email

    await user.save()

    if (profiles && profiles.length > 0) {
      await user.profiles().detach()
      await user.profiles().attach(profiles)
      user.profiles = await user.profiles().fetch()
    }

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.profiles().detach()

    await user.delete()
  }

  async ids ({ request }) {
    const userIds = await User.ids()

    return userIds
  }

  async sponsorAchievements ({ params }) {
    const achievements = Achievement.query().where('sponsorId', params.id)

    return achievements
  }

  async valuerAchivements ({ params }) {
    const achievements = Achievement.query().where('valuerId', params.id)

    return achievements
  }

  async unitAchievements ({ params }) {
    var units = Unit.query().where('responsibleId', params.id).with('evaluations').with('evidences').fetch()

    return units
  }

}

module.exports = UserController
