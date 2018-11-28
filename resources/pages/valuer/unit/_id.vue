<template>
  <div>
    <div class="columns">
      <div class="column is-one-fifth">
        <!-- Here we have the sidebar component -->
        <sideBar
          :profile="2"
          :achievements="achievements"
          :charge-achievement="(id) => chargeAchievement(id)"
        ></sideBar>
      </div>
      <!-- And here comes th unit's render component -->
      <div class="column" v-if="selectedUnit">
        <unitViewer
          :profile="2"
          :unit="selectedUnit"
        >
        </unitViewer>

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
                  <nuxt-link
                    :to="`/valuer/evaluation/${selectedEva.id}`"
                    v-if="selectedEva.status === 'Vigente'"
                    class="button"
                    @click=""
                  >
                    Avaliar
                  </nuxt-link>
                  <button class="button is-warning" @click="editEvaluation">Editar</button>
                  <button class="button is-danger" @click="deleteEvaluation">Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br/>
        <!-- unit's valuations table -->
        <div v-if="selectedUnit.evaluations.length === 0">
          Ainda não existem avaliações.
        </div>
        <div v-else>
          <b-table
            :data="selectedUnit.evaluations"
            :columns="columns"
            :selected.sync="selectedEva"
            focusable
          ></b-table>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <section>
      <div v-if="creation">
        <b-modal :active.sync="creation" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de avaliação</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Tipo">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Contexto</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Status">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Vigente</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Contratante">
                    <b-input
                      v-model="evaluation.contractor"
                      placeholder="Nome do contratante"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Parceiro">
                    <b-input
                      v-model="evaluation.partner"
                      placeholder="Nome do parceiro"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Data de início">
                    <b-datepicker
                        placeholder="Selecione a data de início..."
                        icon="calendar-today"
                        v-model="evaluation.startDate"
                        :readonly="false">
                    </b-datepicker>
                </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="creation = false">Cancelar</button>
                    <button class="button is-primary" @click="createEvaluation">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="edition">
        <b-modal :active.sync="edition" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Atualização de avaliação</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Tipo">
                    <b-input
                      v-model="edited.type"
                      placeholder="Nome do contratante"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Status">
                    <b-input
                      v-model="edited.status"
                      placeholder="Nome do contratante"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Contratante">
                    <b-input
                      v-model="edited.contractor"
                      placeholder="Nome do contratante"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Parceiro">
                    <b-input
                      v-model="edited.partner"
                      placeholder="Nome do parceiro"
                      required>
                    </b-input>
                  </b-field>

                  <b-field label="Data de início">
                    <b-datepicker
                        placeholder="Selecione a data de início..."
                        icon="calendar-today"
                        v-model="evaluation.startDate"
                        :readonly="false">
                    </b-datepicker>
                  </b-field>

                  <b-field label="Data de finalização">
                    <b-datepicker
                        placeholder="Selecione a data de finalização..."
                        icon="calendar-today"
                        v-model="evaluation.endDate"
                        :readonly="false">
                    </b-datepicker>
                </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="edition = false">Cancelar</button>
                    <button class="button is-primary" @click="updateEvaluation">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import sideBar from '~/components/side-bar.vue'
import unitViewer from '~/components/unit-viewer.vue'

export default {
  name: 'valuer-unit',

  layout: 'basic',

  components: { sideBar, unitViewer },

  created () {
    this.loadUnit()
  },

  data: () => ({
    achievements: [],
    selectedUnit: null,
    creation: false,
    edition: false,
    selectedEva: false,

    evaluation: {
      type: 'contexto',
      status: 'Vigente',
      contractor: '',
      partner: '',
      startDate: ''
    },

    contractors: [
      'Lorem',
      'Inpsun',
      'Sit amet'
    ],
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
      },
      {
        field: 'startDate',
        label: 'Data de início',
        centered: true
      },
      {
        field: 'endDate',
        label: 'Data de finalização',
        centered: true
      }
    ],
    edited: {}
  }),

  methods: {
    async loadUnit () {
      const achievements = await this.$axios.$get('/api/achievements')
      this.achievements = achievements
      var id = this.$route.params.id
      const selectedUnit = await this.$axios.$get(`/api/units/${id}`)
      this.selectedUnit = selectedUnit
    },

    async createEvaluation () {
      this.evaluation.unitId = this.selectedUnit.id
      this.evaluation.valuerId = this.selectedUnit.valuer.id
      this.evaluation.responsibleId = this.selectedUnit.responsible.id

      await this.$axios.$post('api/evaluations', this.evaluation)
        .then(this.handleSuccess)
        .catch(this.handleFail)
    },

    handleSuccess () {
      this.$toast.open({
        message: 'Avaliação criada com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
    },

    handleFail () {
      this.$toast.open({
        message: 'Falha ao criar avaliação. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    editEvaluation () {
      Object.assign(this.edited, this.selectedEva)
      this.edition = true
    },

    async updateEvaluation () {
      const {id} = this.edited
      await this.$axios.$put(`api/evaluations/${id}`, this.edited)
      Object.assign(this.selected, this.edited)
    },

    async deleteEvaluation () {
      const {id} = this.selectedEva
      await this.$axios.$delete(`api/evaluations/${id}`)
      this.loadUnit()
    },

    chargeAchievement () {}
  }
}
</script>

<style>
.button {
  padding: 5px;
  display: inline-flex
}
</style>
