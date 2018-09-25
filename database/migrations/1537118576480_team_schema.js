'use strict'

const Schema = use('Schema')

class TeamSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.integer('userId').unsigned()
      table.foreign('userId').references('users.id')
      table.integer('achievementId').unsigned()
      table.foreign('achievementId').references('achievements.id')
      table.integer('profileId').unsigned()
      table.foreign('profileId').references('profiles.id')
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('id').inTable('evaluations')
      table.timestamps()
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamSchema
