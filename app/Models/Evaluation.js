'use strict'

const Model = use('Model')

class Evaluation extends Model {
  units () {
    return this.belongsTo('App/Models/Unit', 'unitId')
  }
}

module.exports = Evaluation
