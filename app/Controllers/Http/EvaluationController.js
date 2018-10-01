'use strict'

const Evaluation = use('App/Models/Evaluation')

/**
 * Resourceful controller for interacting with evaluations
 */
class EvaluationController {
  /**
   * Show a list of all evaluations.
   * GET evaluations
   */
  async index ({ request, response, view }) {
    const evaluation = Evaluation
      .query()
      .with('evidences')
      .fetch()

    return evaluation
  }

  /**
   * Render a form to be used for creating a new evaluation.
   * GET evaluations/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new evaluation.
   * POST evaluations
   */
  async store ({ request, response }) {
    const data = request.only(['unitId', 'type', 'status', 'contractor', 'partner', 'startDate', 'endDate'])

    const evaluation = await Evaluation.create(data)

    return evaluation
  }

  /**
   * Display a single evaluation.
   * GET evaluations/:id
   */
  async show ({ params, request, response, view }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    if (!evaluation) {
      return response.status(404).json({ message: 'Evaluation not found!' })
    }

    return evaluation
  }

  /**
   * Render a form to update an existing evaluation.
   * GET evaluations/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update evaluation details.
   * PUT or PATCH evaluations/:id
   */
  async update ({ params, request, response }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    const data = request.only(['type', 'status', 'contractor', 'partner', 'startDate', 'endDate'])

    evaluation.merge(data)
    await evaluation.save()
    return evaluation
  }

  /**
   * Delete a evaluation with id.
   * DELETE evaluations/:id
   */
  async destroy ({ params }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    await evaluation.delete()
  }
}

module.exports = EvaluationController
