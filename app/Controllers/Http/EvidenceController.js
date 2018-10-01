'use strict'

const Evidence = use('App/Models/Evidence')

class EvidenceController {
  async index ({ request, response }) {
    const evidence = Evidence.all()

    return evidence
  }

  async store ({ request, response }) {
    const data = request.only(['evaluationId', 'role', 'skills'])

    const evidence = await Evidence.create(data)

    return evidence
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = EvidenceController
