'use strict'

class SessionController {
  async login ({ request, auth }) {
    const { email, password } = request.all()

    return await auth.attempt(email, password)
  }

  }
}

module.exports = SessionController
