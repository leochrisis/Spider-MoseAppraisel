'use strict'

const Model = use('Model')

class Unit extends Model {
  achievements () {
    return this.belongsTo('App/Models/achievement', 'achievementId')
  }

  evaluations () {
    return this.hasMany('App/Models/Evaluation', 'id', 'unitId')
  }

  evidences () {
    return this.hasMany('App/Models/Evidence', 'id', 'unitId')
  }

  members () {
    return this
      .belongsToMany('App/Models/UserProfile', 'unitId', 'userProfileId')
      .pivotTable('teams')
  }
}

module.exports = Unit
