'use strict'

const Schema = use('Schema')

class EvidenceSchema extends Schema {
  up () {
    this.create('evidences', (table) => {
      table.increments()
      table.integer('evaluationId').unsigned()
      table.foreign('evaluationId').references('evaluations.id')
      table.string('role', 50)
      table.string('skills', 300)
      table.timestamps()
    })
  }

  down () {
    this.drop('evidences')
  }
}

module.exports = EvidenceSchema
