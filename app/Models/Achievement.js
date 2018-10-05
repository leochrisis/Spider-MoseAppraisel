'use strict'

const Model = use('Model')

class Achievement extends Model {
  units () {
    return this.hasMany('App/Models/Unit', 'id', 'achievementId')
  }

  roles () {
    return this
      .belongsToMany('App/Models/UserProfile', 'achievementId', 'userProfileId')
      .pivotTable('profile_achievements_teams')
  }

  sponsor () {
    return this.this.belongsTo('App/Models/User', 'userId')
  }
}

module.exports = Achievement
