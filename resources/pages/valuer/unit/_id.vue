<template>
  <div>
    <div class="columns">
      <div class="column is-one-fifth">
        <aside class="menu">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">John Smith</p>
                  <p class="subtitle is-6">@johnsmith</p>
                </div>
              </div>
            </div>
          </div>
          <br/>

          <ul class="menu-list gray">
            <a class="button is-info" @click="creation = true">Novo empreendimento</a>
            <br/>
            <p class="menu-label">
              Empreendimentos:
            </p>
            <ul>
              <div v-for="achievement in achievements" :key="achievement.id">
                <li><a @click="chargeAchievement(achievement.id)">{{achievement.name}}</a></li>
                  <li>
                    <ul>
                      <div v-for="unit in achievement.unit" :key="unit.id">
                        <nuxt-link :to="`/valuer/unit/${unit.name}`">
                          {{unit.name}}
                        </nuxt-link>
                      </div>
                    </ul>
                  </li>
              </div>
            </ul>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  async created () {
    const achievements = await this.$axios.$get('/api/achievements')
    this.achievements = achievements
  },

  data: () => ({
    achievements: []
  })
}
</script>
