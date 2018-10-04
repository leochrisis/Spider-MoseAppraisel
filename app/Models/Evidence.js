'use strict'

const Model = use('Model')

class Evidence extends Model {
  units () {
    return this.belongsTo('App/Models/Unit', 'unitId')
  }
}

module.exports = Evidence
