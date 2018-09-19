'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const users = User.all()

    return users
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async show ({ params, response }) {
    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found!' })
    }

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)

    const data = request.only(['username', 'email', 'password'])

    user.merge(data)
    await user.save()
    return user
  }

  async destroy ({ request }) {
    const user = await User.findOrFail(request.params.id)

    await user.delete()
  }
}

module.exports = UserController
