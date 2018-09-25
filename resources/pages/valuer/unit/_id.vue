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
                        <nuxt-link :to="`/valuer/unit/${unit.id}`">
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

      <div class="column" v-if="selected">
        <nav class="navbar is-ligthGray">
          <div class="navbar-start">
            <div class="navbar-item title">
              {{selected.name}}
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-item has-text-centered column is-2">
            <div>
              <p class="heading">Responsável</p>
              <p>
                A unidade não possui responsável.
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered column is-2">
            <div>
              <p class="heading">Descrição</p>
              <p>{{selected.description}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered column is-2">
            <div>
              <p class="heading">Telefone</p>
              <p>{{selected.phone}}</p>
            </div>
          </div>
          <div class="level-item has-text-centered column is-2">
            <div>
              <p class="heading">Número de membros</p>
              <p>{{selected.people_number}}</p>
            </div>
          </div>
        </nav>
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Avaliações
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button class="button is-info" @click="creation = true">Nova</button>
                <div v-if="selectedEva">
                  <button class="button is-warning" @click="editEvaluation">Editar</button>
                  <button class="button is-danger" @click="deleteEvaluation">Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br/>
        <div v-if="selected.evaluation.length === 0">
          Ainda não existem avaliações.
        </div>
        <div v-else>
          <b-table
            :bordered="bordered"
            :data="selected.evaluation"
            :columns="columns"
            focusable
          ></b-table>
        </div>
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
    var id = this.$route.params.id
    const selected = await this.$axios.$get(`/api/unit/${id}`)
    this.selected = selected
  },

  data: () => ({
    achievements: [],
    selected: null,
    responsible: false,
    bordered: true,
    creation: false,
    edition: false,
    columns: [
      {
        field: 'type',
        label: 'Tipo',
        centered: true
      },
      {
        field: 'status',
        label: 'status',
        centered: true
      },
      {
        field: 'contractor',
        label: 'Contratante',
        centered: true
      },
      {
        field: 'partner',
        label: 'Parceiro',
        centered: true
      }
    ]
  }),

  methods: {
  }
}
</script>
