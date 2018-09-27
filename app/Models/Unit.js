'use strict'

const Model = use('Model')

class Unit extends Model {
  achievements () {
    return this.belongsTo('App/Models/achievement', 'achievementId')
  }

  evaluations () {
    return this.hasMany('App/Models/Evaluation', 'id', 'unitId')
  }
}

module.exports = Unit
