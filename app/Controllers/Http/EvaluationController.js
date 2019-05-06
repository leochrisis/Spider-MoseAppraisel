'use strict'

const Evaluation = use('App/Models/Evaluation')

class EvaluationController {

  async index ({ request, response, view }) {
    const evaluation = Evaluation
      .query()
      .with('evidences')
      .with('results')
      .fetch()

    return evaluation
  }

  async store ({ request, response }) {
    const {
      type,
      status,
      contractor,
      partner,
      startDate,
      unitId,
      valuerId,
      responsibleId
    } = request.post()

    const evaluation = await Evaluation
      .create({type, status, contractor, partner, startDate, valuerId, unitId, responsibleId})

    return evaluation
  }

  async show ({ params, request, response, view }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    if (!evaluation) {
      return response.status(404).json({ message: 'Evaluation not found!' })
    }

    const evidences = await evaluation.evidences().fetch()
    evaluation.evidences = evidences

    const results = await evaluation.results().fetch()
    evaluation.results = results

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


  async sponsorConfirm ({ params, request }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    const data = request.only(['sponsorConfirmation'])
    evaluation.merge(data)
    
    await evaluation.save()
    return evaluation
  }

  async responsibleConfirm ({ params, request }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    const data = request.only(['responsibleConfirmation'])
    evaluation.merge(data)
    await evaluation.save()
    return evaluation
  }

  async valuerConfirm ({ params, request }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    const data = request.only(['valuerConfirmation'])
    evaluation.merge(data)
    await evaluation.save()
    return evaluation
  }
}

module.exports = EvaluationController
