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

  async destroy ({ request }) {
    const user = await User.findOrFail(request.params.id)

    await user.delete()
  }
}

module.exports = UserController
