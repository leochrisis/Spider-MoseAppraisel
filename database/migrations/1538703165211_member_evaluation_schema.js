'use strict'

const Schema = use('Schema')

class MemberEvaluationSchema extends Schema {
  up () {
    this.create('member_evaluations', (table) => {
      table.increments()
      table.integer('memberId').unsigned()
      table.foreign('memberId').references('member_roles.id')
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('member_evaluations')
  }
}

module.exports = MemberEvaluationSchema
