const TOKEN = 'app/TOKEN'
const USER = 'app/USER'

const storedUser = localStorage.getItem(USER)
const authUser = storedUser
? JSON.parse(storedUser)
: false

export const state = () => ({
  authUser
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

      commit('SET_USER', data)
      localStorage.setItem(TOKEN, token)
      localStorage.setItem(USER, JSON.stringify(data))
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }

      throw error
    }
  },

  async logout ({ commit }) {
    this.$axios.setToken(false)
    commit('SET_USER', null)
    localStorage.setItem(TOKEN, '')
    localStorage.setItem(USER, '')
  }
}

export const getters = {
  isAdmin (state) {
    var profiles = state.authUser.profiles.map(function (el) {
      return el.id
    })
    return state.authUser && profiles.includes(1)
  },

  isValuer (state) {
    var profiles = state.authUser.profiles.map(function (el) {
      return el.id
    })
    return state.authUser && profiles.includes(2)
  },

  isSponsor (state) {
    var profiles = state.authUser.profiles.map(function (el) {
      return el.id
    })
    return state.authUser && profiles.includes(3)
  },

  isResponsible (state) {
    var profiles = state.authUser.profiles.map(function (el) {
      return el.id
    })
    return state.authUser && profiles.includes(4)
  },

  isMember (state) {
    var profiles = state.authUser.profiles.map(function (el) {
      return el.id
    })
    return state.authUser && profiles.includes(5)
  }
}
