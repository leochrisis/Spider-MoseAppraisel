'use strict'

const Model = use('Model')

class Achievement extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Achievement
