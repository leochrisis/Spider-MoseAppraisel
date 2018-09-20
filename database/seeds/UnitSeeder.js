'use strict'

/*
|--------------------------------------------------------------------------
| UnitSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Unit = use('App/Models/Unit')

class UnitSeeder {
  async run () {
    await Unit.create({
      achievement_id: 1,
      name: 'Lorde',
      description: 'Here to help you on your app',
      phone: '8033-3265',
      people_number: 45
    })
    await Unit.create({
      achievement_id: 1,
      name: 'Green ligth',
      description: 'Let it go!',
      phone: '8033-3547',
      people_number: 120
    })
    await Unit.create({
      achievement_id: 1,
      name: 'Sober',
      description: 'King and queen of the weekends!',
      phone: '8033-5555',
      people_number: 320
    })
    await Unit.create({
      achievement_id: 2,
      name: 'Loyalty',
      description: 'Masters of cards!',
      phone: '8033-6547',
      people_number: 30
    })
  }
}

module.exports = UnitSeeder
