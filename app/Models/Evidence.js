'use strict'

const Model = use('Model')

class Evidence extends Model {
  units () {
    return this.belongsTo('App/Models/Unit', 'unitId')
  }

  owners () {
    return this
      .belongsToMany('App/Models/Team', 'evidenceId', 'memberId')
      .pivotTable('member_roles')
  }
}

module.exports = Evidence
