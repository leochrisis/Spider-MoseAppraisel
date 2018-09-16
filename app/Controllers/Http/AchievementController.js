'use strict'

const Achievement = use('App/Models/Achievement')

class AchievementController {
  async index () {
    const achievements = Achievement.all()

    return achievements
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'cnpj', 'phone', 'adress'])

    const achievement = await Achievement.create(data)

    return achievement
  }

  async show ({ params, response }) {
    const achievement = await Achievement.findOrFail(params.id)

    if (!achievement) {
      return response.status(404).json({ message: 'Achievement not found!' })
    }

    return achievement
  }

  async update ({ params, request, response }) {
    const achievement = await Achievement.findOrFail(params.id)

    const data = request.only(['name', 'cnpj', 'phone', 'adress'])

    achievement.merge(data)
    await achievement.save()
    return achievement
  }

  async destroy ({ params }) {
    const achievement = await Achievement.findOrFail(params.id)

    await achievement.delete()
  }
}

module.exports = AchievementController
