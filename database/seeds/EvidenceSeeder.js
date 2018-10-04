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
      unitId: 1,
      role: 'Gerente de projetos',
      skills: 'Trabalha bem'
    })

    await Evidence.create({
      unitId: 2,
      role: 'Analista de requisitos',
      skills: 'Legal com os clientes'
    })

    await Evidence.create({
      unitId: 1,
      role: 'Programador',
      skills: 'Só chora'
    })
  }
}

module.exports = EvidenceSeeder
