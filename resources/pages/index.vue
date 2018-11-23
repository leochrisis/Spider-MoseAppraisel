<template>
  <div class="column is-4 is-offset-4">
    <div class="box">
      <form @submit.prevent="login">
        <section>
          <b-field>
            <b-input
              type="email"
              placeholder="Email"
              v-model="email"
              required
            >
            </b-input>
          </b-field>

          <b-field>
              <b-input
                type="password"
                password-reveal
                placeholder="Senha"
                v-model="password"
                required
              >
              </b-input>
          </b-field>
        </section>
        <br/>
        <a class="button is-info" @click="login">Entrar</a>
      </form>
    </div>
      <p class="has-text-white">
        <a href="../">Esqueci a senha</a> &nbsp;·&nbsp;
        <a href="../">Precisa de ajuda?</a>
      </p>
  </div>
</template>

<script>
export default {
  name: 'Login',

  layout: 'auth',

  data: () => ({
    email: '',
    password: ''
  }),

  mounted () {
    this.email = localStorage.getItem('lastEmail') || ''
  },

  methods: {
    async login () {
      const { email, password } = this
      this.$store.dispatch('login', { email, password })
        .then(this.handleSuccess)
        .catch(this.handleFail)
    },

    handleSuccess () {
      localStorage.setItem('lastEmail', this.email)

      this.$toast.open({
        message: 'Login realizado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })

      if (this.$store.getters.profiles) {
        this.$router.push({path: '/chooser', success: true})
      } else if (this.$store.getters.isAdmin) {
        this.$router.push({path: '/admin', success: true})
      } else if (this.$store.getters.isValuer) {
        this.$router.push({path: '/valuer/achievements', success: true})
      } else if (this.$store.getters.isSponsor) {
        this.$router.push({path: '/sponsor', success: true})
      } else if (this.$store.getters.isResponsible) {
        this.$router.push({path: '/responsible', success: true})
      }
    },

    handleFail (response) {
      this.$toast.open({
        message: 'Falha ao entrar. Email ou senha incorretos.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style>
.button {
  padding: 5px;
  display: inline-flex
}
</style>
