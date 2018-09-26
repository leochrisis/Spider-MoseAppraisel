'use strict'

const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.increments()
      table.integer('achievementId').unsigned()
      table.foreign('achievementId').references('achievements.id').onDelete('cascade')
      table.string('name').notNullable()
      table.string('description', 500)
      table.string('phone').notNullable()
      table.integer('people_number')
      table.timestamps()
    })
  }

  down () {
    this.drop('units')
  }
}

module.exports = UnitSchema
