'use strict'

const Schema = use('Schema')

class EvaluationSchema extends Schema {
  up () {
    this.create('evaluations', (table) => {
      table.increments()
      table
        .integer('unit_id')
        .unsigned()
        .references('id')
        .inTable('units')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('type').notNullable()
      table.string('status').notNullable()
      table.string('contractor').notNullable()
      table.string('partner').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('evaluations')
  }
}

module.exports = EvaluationSchema
