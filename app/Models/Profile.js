'use strict'

const Model = use('Model')

class Profile extends Model {
  user () {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Profile
