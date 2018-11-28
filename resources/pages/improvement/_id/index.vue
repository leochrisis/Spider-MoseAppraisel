<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Plano de melhoria
        </h1>
      </div>
      <div class="navbar-end">
        <nuxt-link to="`/${evaluation.id}/map`">
          mapa de calor
        </nuxt-link>
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
                  <p>link para a evidência {{i}}: <a>{{evidence.url}}</a></p>
                </div>
                <div v-if="result.length > 0">
                  </hr>
                  <p><strong>Resultado:</strong> {{result[0].result}}</p>
                  </br>
                  <p><strong>Problemas:</strong> {{result[0].problem}}</p>

                  <p><strong>Solução</strong></p>
                    <b-input type="textarea" v-model="plan.solution"></b-input>
                    </br>

                    <b-field label="Quem resolve?">
                      <b-autocomplete
                        rounded
                        v-model="name"
                        :data="filteredMemberObj"
                        placeholder="Insira o nome do membro"
                        icon="magnify"
                        field="username"
                        @select="option => member = option">
                      </b-autocomplete>
                    </b-field>

                    <p><strong>Quando resolve?</strong></p>
                    <b-datepicker
                      placeholder="Selecione uma data..."
                      v-model="plan.solutionDate"
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
                <div v-else>
                  <p>Critério não aplicável</p>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item" @click="addImprovementPlan(objective.id)">Salvar</a>
                </footer>
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

  async created () {
    const id = this.$route.params.id
    const evaluation = await this.$axios.$get(`/api/evaluations/${id}`)
    this.evaluation = evaluation

    const unitId = this.evaluation.unitId
    const unit = await this.$axios.$get(`/api/units/${unitId}`)
    this.membersId = unit.members

    const team = await this.$axios.$get(`/api/unit-id/${unitId}`)
    this.team = team
    this.chargeMembers()
  },

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
    },

    filteredMemberObj () {
      return this.members.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },

  data: () => ({
    competences: competences,
    evidences: [],
    result: [],
    plan: {
      solution: '',
      solutionDate: '',
      status: 'novo'
    },
    membersId: null,
    team: null,
    members: [],
    evaluation: null,
    name: '',
    member: null
  }),

  methods: {
    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.$route.params.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      const result = await this.$axios.$post('/api/res-practice/', data)

      this.evidences = evidences
      this.result = result
    },

    async addImprovementPlan (practice) {
      this.plan.practice = practice
      this.plan.resultId = this.result[0].id
      this.plan.memberId = this.member.id

      await this.$axios.$post('/api/improvements/', this.plan)
    },

    async chargeMembers () {
      this.members = []
      for (var i = 0; i < this.membersId.length; i++) {
        var user = await this.$axios.$get(`/api/users/${this.membersId[i].userId}`)
        this.members.push(user)
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
