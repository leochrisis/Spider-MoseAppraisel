'use strict'

const Evidence = use('App/Models/Evidence')

class EvidenceController {
  async index ({ request, response }) {
    const evidence = Evidence.all()

    return evidence
  }

  async store ({ request, response }) {
    const {unitId, role, skills} = request.post()

    const evidence = await Evidence.create({unitId, role, skills})

    return evidence
  }

  async show ({params, request, response}) {
    const evidence = await Evidence.findOrFail(params.id)

    if (!evidence) {
      return response.status(404).json({ message: 'Evidence not found!' })
    }

    return evidence
  }

  async update ({ params, request, response }) {
    const evidence = await Evidence.findOrFail(params.id)

    const {unitId, role, skills} = request.post()

    evidence.merge({unitId, role, skills})

    await evidence.save()
    return evidence
  }

  async destroy ({ params, request, response }) {
    const evidence = await Evidence.findOrFail(params.id)

    await evidence.delete()
  }
}

module.exports = EvidenceController
