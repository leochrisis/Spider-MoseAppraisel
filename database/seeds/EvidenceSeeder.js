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
      url: 'www.example.com',
      font: 'member',
      practice: 'TH1',
      evaluationId: 1
    })

    await Evidence.create({
      url: 'www.example1.com',
      font: 'member',
      practice: 'TH1',
      evaluationId: 1
    })

    await Evidence.create({
      url: 'www.example2.com',
      font: 'leonardo',
      practice: 'TH1',
      evaluationId: 1
    })

    await Evidence.create({
      url: 'www.example3.com',
      font: 'leonardo',
      practice: 'IN',
      evaluationId: 2
    })
  }
}

module.exports = EvidenceSeeder
