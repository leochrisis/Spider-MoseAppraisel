const TOKEN = 'app/TOKEN'
const USER = 'app/USER'

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
    const { auth } = req
    if (auth && auth.user) {
      commit('SET_USER', auth.user)
    }
  },

  async login ({ commit }, { email, password }) {
    try {
      const { data: { token } } = await this.$axios.post('/api/login', { email, password })
      this.$axios.setToken(token, 'Bearer')

      const { data } = await this.$axios.get('api/me')
      const user = await this.$axios.get(`/api/users/${data.id}`)

      commit('SET_USER', user.data)
      localStorage.setItem(TOKEN, token)
      localStorage.setItem(USER, JSON.stringify(user.data))
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

export const getters = {
  isAdmin (state) {
    var profiles = state.authUser.profiles.map(function (el) {
      return el.id
    })
    return state.authUser && profiles.includes(1)
  }
}
