'use strict'

/**
 * Resourceful controller for interacting with units
 */
class UnitController {
  /**
   * Show a list of all units.
   * GET units
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new unit.
   * GET units/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new unit.
   * POST units
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single unit.
   * GET units/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing unit.
   * GET units/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update unit details.
   * PUT or PATCH units/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a unit with id.
   * DELETE units/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UnitController
