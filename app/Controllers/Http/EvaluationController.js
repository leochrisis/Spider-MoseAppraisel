'use strict'

/**
 * Resourceful controller for interacting with evaluations
 */
class EvaluationController {
  /**
   * Show a list of all evaluations.
   * GET evaluations
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new evaluation.
   * GET evaluations/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new evaluation.
   * POST evaluations
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single evaluation.
   * GET evaluations/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing evaluation.
   * GET evaluations/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update evaluation details.
   * PUT or PATCH evaluations/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a evaluation with id.
   * DELETE evaluations/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EvaluationController
