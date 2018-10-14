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
    const data = request.only(['unitId', 'type', 'status', 'contractor', 'partner', 'startDate', 'endDate'])

    const evaluation = await Evaluation.create(data)

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

    const data = request.only(['type', 'status', 'contractor', 'partner', 'startDate', 'endDate'])

    evaluation.merge(data)
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
