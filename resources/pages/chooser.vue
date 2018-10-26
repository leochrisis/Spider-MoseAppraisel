<template>
  <div>
    <div>
      <section class="hero is-primary is-fullheight">
        <div class="hero-body">
          <div class="container is-fluid has-text-centered">
            <p>Entrar na ferramenta como:</p>
              <div v-for="profile in profiles">
                <button class="button" @click="selectRoute(profile)">{{profile}}</button>
              </br>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  created () {
    const user = this.$store.state.authUser

    for (var i = 0; i < user.profiles.length; i++) {
      this.profiles.push(user.profiles[i].profile)
    }
  },

  computed: {
    loggedUser () {
      return this.$store.state.authUser
    }
  },

  data: () => ({
    profiles: []
  }),

  methods: {
    selectRoute (profile) {
      switch (profile) {
        case 'administrador':
          this.$router.push({path: '/admin', success: true})
          break
        case 'avaliador':
          this.$router.push({path: '/valuer', success: true})
          break
        case 'patrocinador':
          this.$router.push({path: '/sponsor', success: true})
          break
        case 'responsável':
          this.$router.push({path: '/responsible', success: true})
      }
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
