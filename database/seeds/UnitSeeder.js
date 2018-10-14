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
      name: 'Lorde',
      description: 'Here to help you on your app',
      phone: '8033-3265',
      people_number: 45,
      achievementId: 1,
      responsibleId: 4,
      valuerId: 2
    })
    await Unit.create({
      name: 'Green ligth',
      description: 'Let it go!',
      phone: '8033-3547',
      people_number: 120,
      achievementId: 1,
      responsibleId: 4,
      valuerId: 6
    })
    await Unit.create({
      name: 'Sober',
      description: 'King and queen of the weekends!',
      phone: '8033-5555',
      people_number: 320,
      achievementId: 1,
      responsibleId: 4,
      valuerId: 2
    })
    await Unit.create({
      name: 'Loyalty',
      description: 'Masters of cards!',
      phone: '8033-6547',
      people_number: 30,
      achievementId: 2,
      responsibleId: 8,
      valuerId: 2
    })
  }
}

module.exports = UnitSeeder
