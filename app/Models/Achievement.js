'use strict'

const Model = use('Model')

class Achievement extends Model {
  userprofile () {
    return this.belongsTo('App/Models/UserProfile')
  }

  unit () {
    return this.hasMany('App/Models/Unit')
  }
}

module.exports = Achievement
