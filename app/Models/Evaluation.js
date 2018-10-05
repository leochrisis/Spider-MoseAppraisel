'use strict'

const Model = use('Model')

class Evaluation extends Model {
  units () {
    return this.belongsTo('App/Models/Unit', 'unitId')
  }

  evidences () {
    return this.hasMany('App/Models/Evidence', 'id', 'evaluationId')
  }

  particpants () {
    return this
      .belongsToMany('App/Models/MamberRole', 'evaluationId', 'memberId')
      .pivotTable('member_evaluations')
  }
}

module.exports = Evaluation
