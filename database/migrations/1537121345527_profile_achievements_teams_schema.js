'use strict'

const Schema = use('Schema')

class ProfileAchievementsTeamsSchema extends Schema {
  up () {
    this.create('profile_achievements_teams', (table) => {
      table.increments()
      table.integer('userId').unsigned()
      table.foreign('userId').references('user.id')
      table.integer('profileId').unsigned()
      table.foreign('profileId').references('profiles.id')
      table.integer('achievementId').unsigned()
      table.foreign('achievementId').references('achievements.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('profile_achievements_teams')
  }
}

module.exports = ProfileAchievementsTeamsSchema
