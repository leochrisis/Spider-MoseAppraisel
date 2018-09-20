'use strict'

const Unit = use('App/Models/Unit')

/**
 * Resourceful controller for interacting with units
 */
class UnitController {
  /**
   * Show a list of all units.
   * GET units
   */
  async index () {
    return await Unit
      .query()
      .with('evaluation')
      .fetch()
  }

  /**
   * Render a form to be used for creating a new unit.
   * GET units/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new unit.
   * POST units
   */
  async store ({ request, response }) {
    const data = request.only(['achievement_id', 'name', 'description', 'phone', 'people_number'])

    const unit = await Unit.create(data)

    return unit
  }

  /**
   * Display a single unit.
   * GET units/:id
   */
  async show ({ request }) {
    return await Unit.query()
      .where('id', request.params.id)
      .with('evaluation')
      .first()
  }

  /**
   * Render a form to update an existing unit.
   * GET units/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update unit details.
   * PUT or PATCH units/:id
   */
  async update ({ params, request, response }) {
    const unit = await Unit.findOrFail(request.params.id)
    const data = request.only(['name', 'description', 'phone', 'people_number'])
    unit.merge(data)
    await unit.save()
    return unit
  }

  /**
   * Delete a unit with id.
   * DELETE units/:id
   */
  async destroy ({ params }) {
    const unit = await Unit.findOrFail(params.id)
    await unit.delete()
  }
}

module.exports = UnitController
