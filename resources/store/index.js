export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login ({ commit }, { email, password }) {
    try {
      const { data: { token } } = await this.$axios.post('/api/login', { email, password })
      this.$axios.setToken(token, 'Bearer')

      const { data } = await this.$axios.get('api/me')
      const user = await this.$axios.get(`/api/users/${data.id}`)

      commit('SET_USER', user.data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }

      throw error
    }
  },

  async logout ({ commit }) {
    await this.$axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
