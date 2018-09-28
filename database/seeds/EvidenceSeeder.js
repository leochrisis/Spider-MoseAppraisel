'use strict'

/*
|--------------------------------------------------------------------------
| EvidenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Evidence = use('App/Models/Evidence')

class EvidenceSeeder {
  async run () {
    await Evidence.create({
      evaluationId: 1,
      role: 'Gerente de projetos',
      description: 'Trabalha bem'
    })

    await Evidence.create({
      evaluationId: 2,
      role: 'Analista de requisitos',
      description: 'Legal com os clientes'
    })

    await Evidence.create({
      evaluationId: 1,
      role: 'Programador',
      description: 'Só chora'
    })
  }
}

module.exports = EvidenceSeeder
