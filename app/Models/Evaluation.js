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

  valuer () {
    return this.this.belongsTo('App/Models/User', 'valuerId')
  }

  responsibles () {
    return this.this.belongsTo('App/Models/User', 'responsibleId')
  }

}

module.exports = Evaluation
