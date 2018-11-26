<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Avaliaçao
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
                <div v-for="(evidence, i) in evidences" :key="evidence.id">
                  <p>link para a evidência {{i}}: <a>{{evidence.url}}</a> </p>
                </br>
                </div>
                <div v-if="result.length === 0">
                  <section>
                    <b-field label="Resultado">
                      <b-select
                        placeholder="Selecione uma cor"
                        v-model="evaluation.result"
                      >
                        <option
                          v-for="color in colors"
                          :value="color.name"
                          :key="color.id"
                        >
                          {{ color.name }}
                        </option>
                      </b-select>
                    </b-field>

                    <b-field label="Problemas encontrados">
                      <b-input maxlength="1000" type="textarea" v-model="evaluation.problem"></b-input>
                    </b-field>
                  </section>
                  <button class="button" @click="addEvaluation(objective.id)">Avaliar</button>
                </div>
                <div v-else>
                  <p><strong>Resultado:</strong> {{result[0].result}}</p>
                  <p><strong>Problemas:</strong> {{result[0].problem}}</p>
                  <button class="button" @click="">Editar</button>
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
                <a @click="chargeEvidences (objective.id)" class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-up' : 'menu-down'">
                  </b-icon>
                </a>
              </div>

              <div class="card-content">
                <div v-for="evidence in evidences" :key="evidence.id">
                  <div class="card">
                    <div class="card-header">
                      <p>Link para a evidênvia: </p>
                      <a href="evidences.url" target="blank"> {{evidence.url}}</a>
                    </div>

                    <div class="card-content">
                      <section>
                        <b-field label="Resultado">
                          <b-select
                            placeholder="Selecione uma cor"
                            v-model="result"
                          >
                            <option
                              v-for="color in colors"
                              :value="color.id"
                              :key="color.id"
                            >
                              {{ color.name }}
                            </option>
                          </b-select>
                        </b-field>

                        <b-field label="Problemas encontrados">
                          <b-input maxlength="1000" type="textarea" v-model="evaluation.problems"></b-input>
                        </b-field>
                      </section>

                      <button class="button" @click="addEvaluation(evidence.id)">Avaliar</button>
                    </div>
                  </div>
                </br>
                </div>
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
                <div v-for="evidence in evidences" :key="evidence.id">
                  <div class="card">
                    <div class="card-header">
                      <p>Link para a evidênvia: </p>
                      <a href="evidences.url" target="blank"> {{evidence.url}}</a>
                    </div>

                    <div class="card-content">
                      <section>
                        <b-field label="Resultado">
                          <b-select
                            placeholder="Selecione uma cor"
                            v-model="result"
                          >
                            <option
                              v-for="color in colors"
                              :value="color.name"
                              :key="color.id"
                            >
                              {{ color.name }}
                            </option>
                          </b-select>
                        </b-field>

                        <b-field label="Problemas encontrados">
                          <b-input maxlength="1000" type="textarea" v-model="evaluation.problems"></b-input>
                        </b-field>
                      </section>

                      <button class="button" @click="addEvaluation(evidence.id)">Avaliar</button>
                    </div>
                  </div>
                </br>
                </div>
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
                <div v-for="evidence in evidences" :key="evidence.id">
                  <div class="card">
                    <div class="card-header">
                      <p>Link para a evidênvia: </p>
                      <a href="evidences.url" target="blank"> {{evidence.url}}</a>
                    </div>

                    <div class="card-content">
                      <section>
                        <b-field label="Resultado">
                          <b-select
                            placeholder="Selecione uma cor"
                            v-model="result"
                          >
                            <option
                              v-for="color in colors"
                              :value="color.id"
                              :key="color.id"
                            >
                              {{ color.name }}
                            </option>
                          </b-select>
                        </b-field>

                        <b-field label="Problemas encontrados">
                          <b-input maxlength="1000" type="textarea" v-model="dataToSend.problems"></b-input>
                        </b-field>
                      </section>

                      <button class="button" @click="addEvaluation(evidence.id)">Avaliar</button>
                    </div>
                  </div>
                </br>
                </div>
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
                <div v-for="evidence in evidences" :key="evidence.id">
                  <div class="card">
                    <div class="card-header">
                      <p>Link para a evidênvia: </p>
                      <a href="evidences.url" target="blank"> {{evidence.url}}</a>
                    </div>

                    <div class="card-content">
                      <section>
                        <b-field label="Resultado">
                          <b-select
                            placeholder="Selecione uma cor"
                            v-model="result"
                          >
                            <option
                              v-for="color in colors"
                              :value="color.id"
                              :key="color.id"
                            >
                              {{ color.name }}
                            </option>
                          </b-select>
                        </b-field>

                        <b-field label="Problemas encontrados">
                          <b-input maxlength="1000" type="textarea" v-model="evaluation.problems"></b-input>
                        </b-field>
                      </section>

                      <button class="button" @click="addEvaluation(evidence.id)">Avaliar</button>
                    </div>
                  </div>
                </br>
                </div>
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
    evidences: [],
    selectedOption: [],
    result: [],
    evaluation: {
      result: '',
      problem: ''
    },
    competences: competences,
    colors: [
      {
        id: 1,
        name: 'Verde'
      },
      {
        id: 2,
        name: 'Azul'
      },
      {
        id: 3,
        name: 'Amarelo'
      },
      {
        id: 4,
        name: 'Laranja'
      },
      {
        id: 5,
        name: 'Vermelho'
      },
      {
        id: 6,
        name: 'Cinza'
      }
    ],

    dataToSend: {
      result: '',
      problems: null
    }
  }),

  methods: {
    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      console.log(evidences)
      const result = await this.$axios.$post('/api/res-practice/', data)

      this.evidences = evidences
      this.result = result
    },

    async addEvaluation (practice) {
      this.evaluation.practice = practice
      this.evaluation.evaluationId = this.$route.params.id

      await this.$axios.$post('/api/results/', this.evaluation)
      this.chargeEvidences(practice)
    }
  }
}
</script>

<style>
.margin-layout {
  margin: 15px;
}
</style>

<style>
.button {
  padding: 4px;
  display: inline-flex
}
</style>
