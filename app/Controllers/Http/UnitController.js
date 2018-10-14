'use strict'

const Unit = use('App/Models/Unit')
const User = use('App/Models/User')
const Evaluation = ('App/Models/Evaluation')

class UnitController {
  async index () {
    return await Unit
      .query()
      .with('evaluations')
      .with('members')
      .with('evidences')
      .fetch()
  }

  async store ({ request, response }) {
    const {achievementId, name, description, phone, people_number, valuerId} = request.post()

    const unit = await Unit.create({achievementId, name, description, phone, people_number, valuerId})

    return unit
  }

  async show ({ params, response }) {
    const unit = await Unit.findOrFail(params.id)

    if (!unit) {
      return response.status(404).json({ message: 'User not found!' })
    }

    const evaluations = await unit.evaluations().fetch()
    unit.evaluations = evaluations

    if (unit.responsibleId) {
      const responsible = await User.find(unit.responsibleId)
      unit.sponsor = responsible
    }

    if (unit.valuerId) {
      const valuer = await User.find(unit.valuerId)
      unit.valuer = valuer
    }

    return unit
  }

  async update ({ params, request, response }) {
    const unit = await Unit.findOrFail(request.params.id)

    const {
      achievementId,
      name,
      description,
      phone,
      people_number,
      members,
      responsibleId,
      valuerId} = request.post()

    unit.merge({achievementId, name, description, phone, people_number, responsibleId, valuerId})

    await unit.save()

    if (members && members.length > 0) {
      await unit.members().attach(members)
    }

    return unit
  }

  async destroy ({ params }) {
    const unit = await Unit.findOrFail(params.id)
    await unit.delete()
  }
}

module.exports = UnitController
