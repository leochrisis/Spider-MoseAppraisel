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
                        <li><a>
                        <nuxt-link :to="`/sponsor/unit/${unit.id}`">
                          {{unit.name}}
                        </nuxt-link>
                        </a></li>
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
              <div class="buttons">
                <button class="button is-warning" @click="editUnit">Editar</button>
                <button class="button is-danger" @click="deleteUnit">Deletar</button>
              </div>
            </div>
          </div>
        </nav>
        <nav class="level">
          <div class="level-item has-text-centered column is-2">
            <div>
              <p class="heading">Responsável</p>
              <p>
                A unidade de negócio não possui responsável.
                <a @click="creation = true">Clique aqui para cadastra-lo</a>
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
        </nav>
        <br/>
        <div v-if="selected.evaluations.length === 0">
          Ainda não existem avaliações.
        </div>
        <div v-else>
          <b-table
            :bordered="bordered"
            :data="selected.evaluations"
            :columns="columns"
            focusable
          ></b-table>
        </div>
      </div>
    </div>
    <section>
      <div v-if="creation">
        <b-modal :active.sync="creation" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de patrocinador</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Papel">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Responsável</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Usuário">
                    <b-input
                        v-model="user.username"
                        placeholder="Nome do patrocinador"
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
                        v-model="user.password"
                        placeholder="Senha do usuário"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Confime a senha">
                    <b-input
                        v-model="passwordConfirme"
                        placeholder="Confirme a senha"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="sponsor = false">Cancelar</button>
                    <button class="button is-primary" @click="createUSer">cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  async created () {
    const achievements = await this.$axios.$get('/api/achievements/1')
    this.achievements.push(achievements)
    var id = this.$route.params.id
    const selected = await this.$axios.$get(`/api/units/${id}`)
    this.selected = selected
  },

  data: () => ({
    achievements: [],
    selected: null,
    responsible: false,
    bordered: true,
    creation: false,
    edition: false,
    user: {
      username: '',
      email: '',
      password: '',
      profiles: [4]
    },
    passwordConfirme: '',
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
      }
    ],
    edited: {}
  }),

  methods: {
    async createUser () {
      if (this.user.password === this.passwordConfirme) {
        await this.$axios.$post('api/users', this.user)
      }
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
      const {id} = this.selected
      await this.$axios.$delete(`api/evaluation/${id}`)
    },

    editUnit () {
      Object.assign(this.edited, this.selected)
      this.edition = true
    },

    async updateUnit () {
      const {id} = this.edited
      await this.$axios.$put(`api/unit/${id}`, this.edited)
      Object.assign(this.selected, this.edited)
    },

    async deleteUnit () {
      const {id} = this.selected
      await this.$axios.$delete(`api/unit/${id}`)
      this.$router.push({path: '/sponsor', success: true})
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
