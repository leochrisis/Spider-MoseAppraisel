'use strict'

const Unit = use('App/Models/Unit')

class UnitController {
  async index () {
    return await Unit
      .query()
      .with('evaluations')
      .fetch()
  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    const data = request.only(['achievement_id', 'name', 'description', 'phone', 'people_number'])

    const unit = await Unit.create(data)

    return unit
  }

  async show ({ request }) {
    return await Unit.query()
      .where('id', request.params.id)
      .first()
  }

  async edit ({ params, request, response, view }) {
      .with('evaluations')
  }

  async update ({ params, request, response }) {
    const unit = await Unit.findOrFail(request.params.id)
    const data = request.only(['name', 'description', 'phone', 'people_number'])
    unit.merge(data)
    await unit.save()
    return unit
  }

  async destroy ({ params }) {
    const unit = await Unit.findOrFail(params.id)
    await unit.delete()
  }
}

module.exports = UnitController
