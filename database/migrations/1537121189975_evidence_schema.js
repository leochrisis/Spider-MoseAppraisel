'use strict'

const Schema = use('Schema')

class EvidenceSchema extends Schema {
  up () {
    this.create('evidences', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.string('practice').notNullable()
      table.string('result')
      table.string('problems')
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('evidences')
  }
}

module.exports = EvidenceSchema
