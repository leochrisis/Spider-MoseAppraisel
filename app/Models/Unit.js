'use strict'

const Model = use('Model')

class Unit extends Model {
  evaluation () {
    return this.hasMany('App/Models/Evaluation')
  }
}

module.exports = Unit
