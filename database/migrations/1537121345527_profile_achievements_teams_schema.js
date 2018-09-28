'use strict'

const Schema = use('Schema')

class ProfileAchievementsTeamsSchema extends Schema {
  up () {
    this.create('profile_achievements_teams', (table) => {
      table.increments()
      table.integer('userProfileId').unsigned()
      table.foreign('userProfileId').references('user_profiles.id')
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
