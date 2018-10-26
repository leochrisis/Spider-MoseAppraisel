'use strict'

const Model = use('Model')

class Team extends Model {
  roles () {
    return this
      .belongsToMany('App/Models/EvidenceFont', 'memberId', 'evidenceFontId')
      .pivotTable('member_roles')
  }

  evaluations () {
    return this
      .belongsToMany('App/Models/Evaluation', 'memberId', 'evaluationId')
      .pivotTable('member_roles')
  }
}

module.exports = Team
