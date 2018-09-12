'use strict'

const Model = use('Model')

class UserProfile extends Model {
  user () {
    return this.hasMany('App/Models/User')
  }

  profile () {
    return this.hasMany('App/Models/Profile')
  }

  achievement () {
    return this.hasMany('App/Models/Achievement')
  }
}

module.exports = UserProfile
