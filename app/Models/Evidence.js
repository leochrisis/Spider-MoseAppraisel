'use strict'

const Model = use('Model')

class Evidence extends Model {
  evaluations () {
    return this.belongsTo('App/Models/Evaluation', 'evaluationId')
  }
}

module.exports = Evidence
