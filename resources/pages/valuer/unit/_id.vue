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
            :selected.sync="selectedEva"
            focusable
          ></b-table>
        </div>
      </div>
    </div>
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
    selectedEva: false,
    evaluation: {
      unit_id: '',
      type: 'contetxo',
      status: 'vigente',
      contractor: '',
      partner: '',
      startDate: '',
      endDate: ''
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
    async createEvaluation () {
      this.evaluation.unit_id = this.$route.params.id
      await this.$axios.$post(`api/evaluation`, this.evaluation)
    },

    editEvaluation () {
      Object.assign(this.edited, this.selectedEva)
      this.edition = true
    },

    async updateEvaluation () {
      const {id} = this.edited
      await this.$axios.$put(`api/evaluation/${id}`, this.edited)
      Object.assign(this.selected, this.edited)
    },

    async deleteEvaluation () {
      const {id} = this.selectedEva
      await this.$axios.$delete(`api/evaluation/${id}`)
    }
  }
}
</script>
