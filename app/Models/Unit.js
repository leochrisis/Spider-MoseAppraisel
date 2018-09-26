'use strict'

const Model = use('Model')

class Unit extends Model {
  achievements () {
    return this.belongsTo('App/Models/achievement', 'achievementId')
  }

  evidences () {
    return this.hasMany('App/Models/Evidences')
  }
}

module.exports = Unit
