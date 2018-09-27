'use strict'

/*
|--------------------------------------------------------------------------
| EvaluationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Evaluation = use('App/Models/Evaluation')

class EvaluationSeeder {
  async run () {
    await Evaluation.create({
      unitId: 1,
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Lorem',
      partner: 'Inpsun'
    })
    await Evaluation.create({
      unitId: 1,
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Dolor',
      partner: 'Sit Amet'
    })
    await Evaluation.create({
      unitId: 1,
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Inpsun Dolor',
      partner: 'Sit Amet'
    })
    await Evaluation.create({
      unitId: 2,
      type: 'contexto',
      status: 'Finalizada',
      contractor: 'Inpsun Dolor',
      partner: 'Sit'
    })
  }
}

module.exports = EvaluationSeeder
