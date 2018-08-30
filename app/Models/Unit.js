'use strict'

const Model = use('Model')

class Unit extends Model {
  evaluation () {
    return this.hasMany('App/Models/Evaluation')
  }

  evidences () {
    return this.hasMany('App/Models/Evidences')
  }
}

module.exports = Unit
