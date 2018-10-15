'use strict'

const Schema = use('Schema')

class EvidenceSchema extends Schema {
  up () {
    this.create('evidences', (table) => {
    })
  }

  down () {
    this.drop('evidences')
  }
}

module.exports = EvidenceSchema
