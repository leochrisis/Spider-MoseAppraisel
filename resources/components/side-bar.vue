<template>
  <aside class="menu">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
          <div class="has-text-centered">
            <p class="title is-4">{{loggedUser.username}}</p>
            <p class="subtitle is-6">@{{loggedUser.username}}</p>
          </div>
      </div>
    </div>
    <br/>

    <ul class="menu-list gray">
      <a v-if="profile === 2" class="button is-info has-text-centered" @click="createAchievement">Novo empreendimento</a>
      <br/>
      <p class="menu-label">
        Empreendimentos:
      </p>
      <ul>
        <div v-for="achievement in achievements" :key="achievement.id">
          <li>
            <b-collapse :open="false">
              <div slot="trigger" slot-scope="props" class="card-header">
                <a @click="chargeAchievement(achievement.id)" class="card-header-title">
                  {{achievement.name}}
                </a>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">
                <div v-for="unit in achievement.units" :key="unit.id">
                  <nuxt-link :to="`/valuer/unit/${unit.id}`">
                    {{unit.name}}
                  </nuxt-link>
                </div>
              </div>
            </b-collapse>
          </li>
        </div>
      </ul>
    </ul>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    profile: {
      type: Number,
      required: true
    },

    achievements: {
      type: Array,
      default: []
    },

    chargeAchievement: {
      type: Function,
      default: () => ({})
    },

    createAchievement: {
      type: Function,
      default: () => ({})
    }
  },

  computed: {
    ...mapGetters(['loggedUser'])
  }
}
</script>

<style>
.button {
  padding: 5px;
  display: inline-flex;
},

.menu{
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 500px;
}
</style>
