'use strict'

const Model = use('Model')

class Evidence extends Model {
  unit () {
    return this.belongsTo('App/Models/Unit')
  }
}

module.exports = Evidence
