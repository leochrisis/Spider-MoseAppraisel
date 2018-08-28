'use strict'

const Model = use('Model')

class Evaluation extends Model {
  unit () {
    return this.belongsTo('App/Models/Unit')
  }
}

module.exports = Evaluation
