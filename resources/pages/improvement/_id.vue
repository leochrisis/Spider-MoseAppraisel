<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Plano de melhoria
        </h1>
      </div>
    </section>
    <div class="columns margin-layout">
      <div class="column is-three-quarters is-offset-2">
        <b-tabs>
          <b-tab-item label="Talento Humano">

            <div v-for="objective in objectives.TH" :key="objective.id">
              <b-collapse class="card" :open="false">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{objective.id}} - {{objective.description}}
                </p>
                <a @click="chargeEvidences(objective.id)" class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">
                <div v-for="evidence in evidences" :key="evidence.id">
                  <b-collapse class="card" :open="false">
                    <div slot="trigger" slot-scope="props" class="card-header">
                      <p class="card-header-title">Evidência: </br> <a href="">{{evidence.url}}</a></p>
                      <a class="card-header-icon">
                        <b-icon
                          :icon="props.open ? 'menu-up' : 'menu-down'">
                        </b-icon>
                      </a>
                    </div>

                    <div class="card-content">
                      <p><strong>Problemas</strong></p>
                      <p>{{evidence.problems}}</p>
                      </br>

                      <p><strong>Solução</strong></p>
                      <b-input type="textarea"></b-input>
                      </br>

                      <p><strong>Quem resolve?</strong></p>
                      <b-field>
                        <b-input></b-input>
                      </b-field>
                      </br>

                      <p><strong>Quando resolve?</strong></p>
                      <b-datepicker
                        placeholder="Selecione uma data..."
                        icon="calendar-today">
                      </b-datepicker>
                      </br>

                      <p><strong>Status</strong></p>
                      <b-dropdown>
                        <button class="button is-primary" slot="trigger">
                            <span>Selecione um status</span>
                            <b-icon icon="menu-down"></b-icon>
                        </button>

                        <b-dropdown-item>Novo</b-dropdown-item>
                        <b-dropdown-item>Em andamento</b-dropdown-item>
                        <b-dropdown-item>Finalizado</b-dropdown-item>
                    </b-dropdown>
                    </div>
                    <footer class="card-footer">
                      <a class="card-footer-item">Salvar</a>
                      <a class="card-footer-item">Edit</a>
                    </footer>
                  </b-collapse>
                </div>
              </div>

              </b-collapse>
            </div>
          </b-tab-item>

          <b-tab-item label="Gestão e Qualidade">
            <div v-for="objective in objectives.GQ" :key="objective.id">
              <b-collapse class="card" :open="false">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{objective.id}} - {{objective.description}}
                </p>
                <a @click="" class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">

              </div>

              </b-collapse>
            </div>
          </b-tab-item>

          <b-tab-item label="Cliente e Mercado">
            <div v-for="objective in objectives.CM" :key="objective.id">
              <b-collapse class="card" :open="false">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{objective.id}} - {{objective.description}}
                </p>
                <a @click="chargeEvidences (objective.id)" class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">
              </div>

              </b-collapse>
            </div>
          </b-tab-item>

          <b-tab-item label="Inovação">
            <div v-for="objective in objectives.IN" :key="objective.id">
              <b-collapse class="card" :open="false">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{objective.id}} - {{objective.description}}
                </p>
                <a @click="chargeEvidences (objective.id)" class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">
              </div>

              </b-collapse>
            </div>
          </b-tab-item>

          <b-tab-item label="Sociedade e sustentabilidade">
            <div v-for="objective in objectives.SO" :key="objective.id">
              <b-collapse class="card" :open="false">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{objective.id}} - {{objective.description}}
                </p>
                <a @click="chargeEvidences (objective.id)" class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">
              </div>
              </b-collapse>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import objectives from '~/static/competence-objectives.json'
import competences from '~/static/competences.json'

export default {
  name: 'improvement',

  layout: 'basic',

  computed: {
    ...mapGetters(['loggedUser']),

    objectives () {
      return Object.values(objectives).reduce((acc, result) => {
        if (!acc[result.competence]) {
          acc[result.competence] = []
        }
        acc[result.competence].push(result)
        return acc
      }, {})
    }
  },

  data: () => ({
    competences: competences,
    evidences: []
  }),

  methods: {
    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      console.log(evidences)
      this.evidences = evidences
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
