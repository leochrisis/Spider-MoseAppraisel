'use strict'

const Achievement = use('App/Models/Achievement')

/**
 * Resourceful controller for interacting with achievements
 */
class AchievementController {
  /**
   * Show a list of all achievements.
   * GET achievements
   */
  async index () {
    const achievements = Achievement.all()

    return achievements
  }

  /**
   * Create/save a new achievement.
   * POST achievements
   */
  async store ({ request, response }) {
    const data = request.only(['name', 'cnpj', 'phone', 'adress'])

    const achievement = await Achievement.create(data)

    return achievement
  }

  /**
   * Display a single achievement.
   * GET achievements/:id
   */
  async show ({ params, response }) {
    const achievement = await Achievement.findOrFail(params.id)

    if (!achievement) {
      return response.status(404).json({ message: 'Achievement not found!' })
    }

    return achievement
  }

  /**
   * Update achievement details.
   * PUT or PATCH achievements/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a achievement with id.
   * DELETE achievements/:id
   */
  async destroy ({ params }) {
    const achievement = await Achievement.findOrFail(params.id)

    await achievement.delete()
  }
}

module.exports = AchievementController
