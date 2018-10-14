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
      role: 'Gerente de projetos',
      skills: 'Trabalha bem',
      unitId: 1
    })

    await Evidence.create({
      role: 'Analista de requisitos',
      skills: 'Legal com os clientes',
      unitId: 2
    })

    await Evidence.create({
      role: 'Programador',
      skills: 'Só chora',
      unitId: 1
    })
  }
}

module.exports = EvidenceSeeder
