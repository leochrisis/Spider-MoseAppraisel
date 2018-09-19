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

  async update ({ params, request, response }) {
    const user = await User.findOrFail(params.id)

    const data = request.only(['username', 'email', 'password'])

    user.merge(data)
    await user.save()
    return user
  }


    if (User.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await user.delete()
  }
}

module.exports = UserController
