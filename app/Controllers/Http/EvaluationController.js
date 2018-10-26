'use strict'

const Evaluation = use('App/Models/Evaluation')

class EvaluationController {

  async index ({ request, response, view }) {
    const evaluation = Evaluation
      .query()
      .with('evidences')
      .fetch()

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
      valuerId
    } = request.post()

    const evaluation = await Evaluation
      .create({unitId, type, status, contractor, partner, startDate, valuerId})

    return evaluation
  }

  async show ({ params, request, response, view }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    if (!evaluation) {
      return response.status(404).json({ message: 'Evaluation not found!' })
    }

    const evidences = await evaluation.evidences().fetch()
    evaluation.evidences = evidences

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
      .fetch()

    return evaluation
  }
}

module.exports = EvaluationController
