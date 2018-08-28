'use strict'

/**
 * Resourceful controller for interacting with evidences
 */
class EvidenceController {
  /**
   * Show a list of all evidences.
   * GET evidences
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new evidence.
   * GET evidences/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new evidence.
   * POST evidences
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single evidence.
   * GET evidences/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing evidence.
   * GET evidences/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update evidence details.
   * PUT or PATCH evidences/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a evidence with id.
   * DELETE evidences/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EvidenceController
