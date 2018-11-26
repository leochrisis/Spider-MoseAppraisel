'use strict'

const Model = use('Model')

class Improvement extends Model {
  results () {
    this.belongsTo('App/Models/Result', 'resultId')
  }

  members () {
    this.belongsTo('App/Models/User', 'memberId')  
  }
}

module.exports = Improvement
