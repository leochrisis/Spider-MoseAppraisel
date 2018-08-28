'use strict'

const Schema = use('Schema')

class EvidenceSchema extends Schema {
  up () {
    this.create('evidences', (table) => {
      table.increments()
      table
        .integer('unit_id')
        .unsigned()
        .references('id')
        .inTable('units')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('role').notNullable()
      table.string('habilities', 200).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('evidences')
  }
}

module.exports = EvidenceSchema
