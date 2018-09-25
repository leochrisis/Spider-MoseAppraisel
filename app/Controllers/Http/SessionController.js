'use strict'

class SessionController {
  async login ({ request, auth }) {
    const { email, password } = request.all()

    return await auth.attempt(email, password)
  }

  async logout ({auth, params}) {
    return await auth.logout()
  }
}

module.exports = SessionController
