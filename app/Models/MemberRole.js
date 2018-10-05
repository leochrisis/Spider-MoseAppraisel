'use strict'

const Model = use('Model')

class MemberRole extends Model {
  evaluations () {
    return this
      .belongsToMany('App/Models/Evaluation', 'memberId', 'evaluationId')
      .pivotTable('member_evaluations')
  }
}

module.exports = MemberRole
