'use strict'

const Evaluation = use('App/Models/Evaluation')

class EvaluationController {

  async index ({ request, response, view }) {
    const evaluation = Evaluation.all()

    return evaluation
  }

  async store ({ request, response }) {
    const {
      unitId,
      type,
      status,
      contractor,
      partner,
      startDate,
      endDate,
      valuerId,
      responsibleId
    } = request.post()

    const evaluation = await Evaluation
      .create({unitId, type, status, contractor, partner, startDate, endDate, valuerId, responsibleId})

    return evaluation
  }

  async show ({ params, request, response, view }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    if (!evaluation) {
      return response.status(404).json({ message: 'Evaluation not found!' })
    }

    return evaluation
  }

  async update ({ params, request, response }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    const {
      unitId,
      type,
      status,
      contractor,
      partner,
      startDate,
      endDate,
      valuerId,
      responsibleId
    } = request.post()

    evaluation
      .merge({unitId, type, status, contractor, partner, startDate, endDate, valuerId, responsibleId})

    await evaluation.save()
    return evaluation
  }

  async destroy ({ params }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    await evaluation.delete()
  }

  async unitId ({ params }) {
    const evaluation = await Evaluation
      .query()
      .where('unitId', params.id)
      .with('evidences')
      .fetch()

    return evaluation
  }
}

module.exports = EvaluationController
