'use strict'

const Evidence = use('App/Model/Evidence')

/**
 * Resourceful controller for interacting with evidences
 */
class EvidenceController {
  /**
   * Show a list of all evidences.
   * GET evidences
   */
  async index ({ request, response, view }) {
    const evidence = Evidence.all()

    return evidence
  }

  /**
   * Render a form to be used for creating a new evidence.
   * GET evidences/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new evidence.
   * POST evidences
   */
  async store ({ request, response }) {
    const data = request.only(['role', 'habilities'])

    const evidence = await Evidence.create(data)

    return evidence
  }

  /**
   * Display a single evidence.
   * GET evidences/:id
   */
  async show ({ params, request, response, view }) {
    const evidence = await Evidence.findOrFail(params.id)

    if (!evidence) {
      return response.status(404).json({ message: 'Evidence not found!' })
    }

    return evidence
  }

  /**
   * Render a form to update an existing evidence.
   * GET evidences/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update evidence details.
   * PUT or PATCH evidences/:id
   */
  async update ({ params, request, response }) {
    const evidence = await Evidence.findOrFail(params.id)

    const data = request.only(['role', 'habilities'])

    evidence.merge(data)
    await evidence.save()
    return evidence
  }

  /**
   * Delete a evidence with id.
   * DELETE evidences/:id
   */
  async destroy ({ params, request, response }) {
    const evidence = await Evidence.findOrFail(params.id)

    await evidence.delete()
  }
}

module.exports = EvidenceController
