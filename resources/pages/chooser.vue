<template>
  <div>
    <div>
      <section class="hero is-primary is-fullheight">
        <div class="hero-body">
          <div class="container is-fluid has-text-centered">
            <p>Entrar na ferramenta como:</p>
              <button
                v-for="profiles in loggedUser.profiles"
                class="button"
                @click="selectRoute(profiles.profile)"
              >
               {{profiles.profile}}
             </button>
            </br>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Chooser',

  computed: {
    ...mapGetters(['loggedUser'])
  },

  methods: {
    selectRoute (profile) {
      switch (profile) {
        case 'administrador':
          this.$router.push({path: '/admin', success: true})
          break
        case 'avaliador':
          this.$router.push({path: '/valuer/achievements', success: true})
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
  display: inline-flex;
  margin: 5px;
}
</style>
