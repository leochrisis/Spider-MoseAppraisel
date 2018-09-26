'use strict'

const Model = use('Model')

class Achievement extends Model {
  unit () {
    return this.hasMany('App/Models/Unit')
  }
}

module.exports = Achievement
