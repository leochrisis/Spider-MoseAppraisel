'use strict'

const Model = use('Model')

class Achievement extends Model {
  units () {
    return this.hasMany('App/Models/Unit', 'id', 'achievementId')
  }
}

module.exports = Achievement
