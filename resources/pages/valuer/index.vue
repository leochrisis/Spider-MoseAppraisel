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
                        <li><a>{{unit.name}}</a></li>
                      </div>
                    </ul>
                  </li>
              </div>
            </ul>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div v-if="!achievementSelected">
          escolha um empreendimento para começar.
        </div>
        <div v-else>
          <nav class="navbar is-ligthGray">
            <div class="navbar-start">
              <div class="navbar-item title">
                {{selected.name}}
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <button class="button is-warning" @click="editAchievement">Editar</button>
                  <button class="button is-danger" @click="deleteAchievement">Deletar</button>
                </div>
              </div>
            </div>
          </nav>
          <nav class="level">
            <div class="level-item has-text-centered column is-2">
              <div>
                <p class="heading">Patrocinador</p>
                <p>
                  O Empreendimento não possui patrocinador. 
                  <a @click="sponsor = true">Clique aqui para cadastra-lo</a>
                </p>
              </div>
            </div>
            <div class="level-item has-text-centered column is-2">
              <div>
                <p class="heading">CNPJ</p>
                <p>{{selected.cnpj}}</p>
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
                <p>{{selected.adress}}</p>
              </div>
            </div>
          </nav>
          <nav class="navbar is-transparent">
            <div class="navbar-start">
              <div class="navbar-item title">
                Unidades de negócio
              </div>
            </div>
          </nav>
          <br/>
          <div v-if="selected.unit.length === 0">
            Ainda não existem unidades de negócio.
          </div>
          <div v-else>
            <b-table
              :bordered="bordered"
              :data="selected.unit"
              :columns="columns"
              focusable
            ></b-table>
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
                    <p class="modal-card-title">Cadastro de Empredimento</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="achievement.name"
                        placeholder="Nome do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="CNPJ">
                    <b-input
                        v-model="achievement.cnpj"
                        placeholder="CNPJ do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                        v-model="achievement.phone"
                        placeholder="Telefone do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Endereço">
                    <b-input
                        v-model="achievement.adress"
                        placeholder="Endereço do empreendimento"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="creation = false">Cancelar</button>
                    <button class="button is-primary" @click="createAchievement">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="editing">
        <b-modal :active.sync="editing" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edição de Empredimento</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="edited.name"
                        placeholder="Nome do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="CNPJ">
                    <b-input
                        v-model="edited.cnpj"
                        placeholder="CNPJ do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                        v-model="edited.phone"
                        placeholder="Telefone do empreendimento"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Endereço">
                    <b-input
                        v-model="edited.adress"
                        placeholder="Endereço do empreendimento"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="editing = false">Cancelar</button>
                    <button class="button is-primary" @click="updateAchievement">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

      <div v-if="sponsor">
        <b-modal :active.sync="sponsor" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de patrocinador</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Papel">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>Patrocinador</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Usuário">
                    <b-input
                        v-model="user.name"
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

  data: () => ({
    achievements: [],
    creation: false,
    achievement: {
      name: '',
      cnpj: '',
      phone: '',
      adress: ''
    },
    user: {
      username: '',
      email: '',
      password: ''
    },
    selected: null,
    edited: {},
    editing: false,
    sponsor: false,
    achievementSelected: false,
    bordered: true,
    columns: [
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'name',
        label: 'Nome da UN',
        centered: true
      },
      {
        field: 'description',
        label: 'Descrição da UN',
        centered: true
      },
      {
        field: 'phone',
        label: 'Telefone',
        centered: true
      },
      {
        field: 'people_number',
        label: 'Número de pessoas',
        centered: true
      }
    ]
  }),

  async created () {
    const achievements = await this.$axios.$get('/api/achievements')
    this.achievements = achievements
  },

  methods: {
    async createAchievement () {
      await this.$axios.$post('api/achievements', this.achievement)
    },

    async chargeAchievement (id) {
      const achievement = await this.$axios.$get(`api/achievements/${id}`)
      this.selected = achievement
      this.achievementSelected = true
    },

    editAchievement () {
      Object.assign(this.edited, this.selected)
      this.editing = true
    },

    async updateAchievement () {
      const {id} = this.edited
      await this.$axios.$put(`api/achievements/${id}`, this.edited)
      Object.assign(this.selected, this.edited)
    },

    async deleteAchievement () {
      const {id} = this.selected
      await this.$axios.$delete(`api/achievements/${id}`)
    },

    async createUSer () {
      await this.$axios.$post('api/users', this.user)
    }
  }

}
</script>
