'use strict'

/**
 * Resourceful controller for interacting with memberroles
 */
class MemberRoleController {
  /**
   * Show a list of all memberroles.
   * GET memberroles
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new memberrole.
   * GET memberroles/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new memberrole.
   * POST memberroles
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single memberrole.
   * GET memberroles/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing memberrole.
   * GET memberroles/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update memberrole details.
   * PUT or PATCH memberroles/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a memberrole with id.
   * DELETE memberroles/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MemberRoleController
