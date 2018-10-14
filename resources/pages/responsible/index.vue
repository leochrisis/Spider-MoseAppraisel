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
            <p class="menu-label">
              Unidades de negócio:
            </p>
            <ul>
              <div v-for="(unit, i) in units" :key="unit.id">
                <li><a @click="selectUnit(unit, i)">{{unit.name}}</a></li>
              </div>
            </ul>
          </ul>
        </aside>
      </div>

      <div class="column">
        <div v-if="!selected">
          escolha uma unidade de negócio para começar.
        </div>
        <div v-else>
          <nav class="navbar is-ligthGray">
            <div class="navbar-start">
              <div class="navbar-item title">
                {{selected.name}}
              </div>
            </div>
          </nav>
          <nav class="level">
            <div class="level-item has-text-centered column is-2">
              <div>
                <p class="heading">CNPJ</p>
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
                <p class="heading">Endereço</p>
                <p>{{selected.people_number}}</p>
              </div>
            </div>
          </nav>
          <div class="buttons">
            <a class="button is-info" @click="creation = true">cadastrar membro</a>
            <a class="button is-info" @click="cadastrate = true">cadastrar fonte de evidência</a>
          </div>
          <br/>

          <nav class="navbar is-transparent tabs">
            <div class="container">
              <ul>
                <li><a @click="chargeEvaluations">Avaliações</a></li>
                <li><a @click="chargeMembers">Membros</a></li>
                <li><a @click="chargeEvidences">Evidencias</a></li>
              </ul>
            </div>
          </nav>
            <div v-if="evaluations">
              <nav class="navbar is-transparent">
                <div class="navbar-start">
                  <div class="navbar-item title">
                    Avaliações
                  </div>
                </div>

                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <div v-if="selectedUn">
                        <button class="button" @click="">Plano de melhoria</button>
                        <button class="button">Resultado</button>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div v-if="selected.evaluations.length === 0">
                Ainda não existem unidades de negócio.
              </div>
              <div v-else>
                <b-table
                  :bordered="bordered"
                  :data="selected.evaluations"
                  :columns="columns"
                  :selected.sync="selectedUn"
                  focusable
                ></b-table>
              </div>
            </div>
            <div v-if="evidences">
              <nav class="navbar is-transparent">
                <div class="navbar-start">
                  <div class="navbar-item title">
                    Evidências
                  </div>
                </div>

                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <div v-if="selectedEv">
                        <button class="button is-warning" @click="editionEv = true">Editar</button>
                        <button class="button is-danger" @click="deleteEvidence">Deletar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div v-if="selected.evidences.length === 0">
                Ainda não existem evidencias.
              </div>
              <div v-else>
                <b-table
                  :bordered="bordered"
                  :data="selected.evidences"
                  :columns="columnsEv"
                  :selected.sync="selectedEv"
                  focusable
                ></b-table>
              </div>
            </div>
          </div>
      </div>
    </div>

    <section>
      <div v-if="creation">
        <b-modal :active.sync="creation" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de usuário</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Papel">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Avaliador</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>
                  <b-field label="Usuário">
                    <b-input
                        v-model="user.username"
                        placeholder="Nome de usuário"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Email">
                    <b-input
                        type="email"
                        v-model="user.email"
                        placeholder="Email do usuário"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Senha">
                    <b-input
                        type="password"
                        v-model="user.password"
                        password-reveal
                        placeholder="Senha do usuário"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Confirmação de senha">
                    <b-input
                        type="password"
                        v-model="confirmPassword"
                        password-reveal
                        placeholder="Confirmação de senha"
                        required>
                    </b-input>
                  </b-field>

                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="creation = false">Cancelar</button>
                    <button class="button is-primary" @click="createUser">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="cadastrate">
        <b-modal :active.sync="cadastrate" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de usuário</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Papel">
                    <b-input
                        v-model="evidence.role"
                        placeholder="Papel"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Habilidades">
                    <b-input
                        type="textarea"
                        v-model="evidence.skills"
                        placeholder="Habilidades"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="cadastrate = false">Cancelar</button>
                    <button class="button is-primary" @click="createEvidence">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="editionEv">
        <b-modal :active.sync="editionEv" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de usuário</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Papel">
                    <b-input
                        v-model="selectedEv.role"
                        placeholder="Papel"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Habilidades">
                    <b-input
                        type="textarea"
                        v-model="selectedEv.skills"
                        placeholder="Habilidades"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="editionEv = false">Cancelar</button>
                    <button class="button is-primary" @click="updateEvidence">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
    <button @click="teste">teste</button>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  data: () => ({
    units: [],
    selected: null,
    selectedUn: false,
    bordered: true,
    selectedEv: false,
    editionEv: false,
    user: {
      username: '',
      email: '',
      password: '',
      profiles: [4]
    },
    confirmPassword: '',
    columns: [
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'type',
        label: 'Tipo',
        centered: true
      },
      {
        field: 'status',
        label: 'Status',
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
    ],
    columnsEv: [
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'role',
        label: 'Papel',
        centered: true
      },
      {
        field: 'skills',
        label: 'Habilidades'
      }
    ],
    creation: false,
    cadastrate: false,
    evidence: {
      role: '',
      skills: ''
    },
    evidences: false,
    evaluations: true,
    members: false,
    id: null,
    editionEv: false
  }),

  async created () {
    const id = this.$store.state.authUser.id
    const units = await this.$axios.$get(`/api/responsible-units/${id}`)
    this.units = units
  },

  methods: {
    teste () {
      console.log(this.eviList)
    },

    selectUnit (unit, i) {
      this.selected = unit
      this.id = i
      this.evidences = false
      this.evaluations = true
    },

    async createUser () {
      if (this.user.password === this.confirmPassword) {
        await this.$axios.$post('api/users', this.user)
      }
    },

    async createEvidence () {
      const data = {
        id: this.selected.id,
        role: this.evidence.role,
        skills: this.evidence.skills
      }
      await this.$axios.$post('api/evidences', data)
    },

    chargeEvidences () {
      this.evidences = true
      this.evaluations = false
      this.members = false
      this.selectedUn = false
    },

    chargeEvaluations () {
      this.evidences = false
      this.evaluations = true
      this.members = false
      this.selectedUn = false
    },

    chargeMembers () {
      this.evidences = false
      this.evaluations = false
      this.members = true
      this.selectedUn = false
    },

    async updateEvidence () {
      const {id} = this.selectedEv

      await this.$axios.$put(`api/evidences/${id}`, this.selectedEv)
    },

    async deleteEvidence () {
      const {id} = this.selectedEv

      await this.$axios.$delete(`api/evidences/${id}`)
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
