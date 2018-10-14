'use strict'

/**
 * Resourceful controller for interacting with memberevaluations
 */
class MemberEvaluationController {
  /**
   * Show a list of all memberevaluations.
   * GET memberevaluations
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new memberevaluation.
   * GET memberevaluations/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new memberevaluation.
   * POST memberevaluations
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single memberevaluation.
   * GET memberevaluations/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing memberevaluation.
   * GET memberevaluations/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update memberevaluation details.
   * PUT or PATCH memberevaluations/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a memberevaluation with id.
   * DELETE memberevaluations/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MemberEvaluationController
