'use strict'

const Schema = use('Schema')

class MemberRoleSchema extends Schema {
  up () {
    this.create('member_roles', (table) => {
      table.increments()
      table.integer('memberId').unsigned()
      table.foreign('memberId').references('teams.id')
      table.integer('evidenceId').unsigned()
      table.foreign('evidenceId').references('evidences.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('member_roles')
  }
}

module.exports = MemberRoleSchema
