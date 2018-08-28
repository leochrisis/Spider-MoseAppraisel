'use strict'

const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.increments()
      table
        .integer('achievement_id')
        .unsigned()
        .references('id')
        .inTable('achievements')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
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
