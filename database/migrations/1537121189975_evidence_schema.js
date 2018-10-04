'use strict'

const Schema = use('Schema')

class EvidenceSchema extends Schema {
  up () {
    this.create('evidences', (table) => {
      table.increments()
      table.integer('unitId').unsigned()
      table.foreign('unitId').references('units.id')
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
