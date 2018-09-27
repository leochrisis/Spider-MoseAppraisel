'use strict'

const Model = use('Model')

class Profile extends Model {
  users () {
    return this
      .belongsToMany('App/Models/User', 'profileId', 'userId')
      .pivotTable('user_profiles')
  }
}

module.exports = Profile
