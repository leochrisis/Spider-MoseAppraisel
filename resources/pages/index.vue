<template>
  <div class="column is-4 is-offset-4">
    <div class="box">
      <form @submit.prevent="login">
        <section>
        </b-field>
            <b-input type="email"
              maxlength="30"
              placeholder="Email"
              v-model="email">
            </b-input>
          </b-field>

          <b-field>
              <b-input type="password"
                password-reveal
                placeholder="Senha"
                v-model="password">
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

      if (this.$store.getters.isAdmin) {
        this.$router.push({path: '/admin', success: true})
      } else if (this.$store.getters.isValuer) {
        this.$router.push({path: '/valuer', success: true})
      } else if (this.$store.getters.isSponsor) {
        this.$router.push({path: '/sponsor', success: true})
      } else if (this.$store.getters.isResponsible) {
        this.$router.push({path: '/responsible', success: true})
      }
    },

    handleFail () {
      // nothing here yet
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
