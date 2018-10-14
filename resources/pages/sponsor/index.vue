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
              Empreendimentos:
            </p>
            <ul>
              <div v-for="achievement in achievements" :key="achievement.id">
                <li><a @click="chargeAchievement(achievement.id)">{{achievement.name}}</a></li>
                  <li>
                    <ul>
                      <div v-for="unit in achievement.units" :key="unit.id">
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
          </nav>
          <nav class="level">
            <div class="level-item has-text-centered column is-2">
              <div>
                <p class="heading">Patrocinador</p>
                <p>
                  Leonardo Christian
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
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <button class="button is-info" @click="createUN = true">Nova</button>
                  <div v-if="selectedUN">
                    <button class="button is-warning" @click="editUnit">Editar</button>
                    <button class="button is-danger" @click="deleteUnit">Deletar</button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <br/>
          <div v-if="selected.units.length === 0">
            Ainda não existem unidades de negócio.
          </div>
          <div v-else>
            <b-table
              :bordered="bordered"
              :data="selected.units"
              :columns="columns"
              :selected.sync="selectedUN"
              focusable
            ></b-table>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div v-if="createUN">
        <b-modal :active.sync="createUN" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de unidade de negócio</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="unit.name"
                        placeholder="Nome da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Descrição">
                    <b-input
                        type="textarea"
                        v-model="unit.description"
                        placeholder="Descrição da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                        v-model="unit.phone"
                        placeholder="Telefone da unidade de negócio"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Número de pessoas">
                    <b-input
                        v-model="unit.people_number"
                        placeholder="Número de pessoas da unidade"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="createUN = false">Cancelar</button>
                    <button class="button is-primary" @click="createUnit">Cadastrar</button>
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
                    <p class="modal-card-title">Atualização de unidade de negócio</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Nome">
                    <b-input
                        v-model="editUN.name"
                        placeholder="Nome da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Descrição">
                    <b-input
                        type="textarea"
                        v-model="editUN.description"
                        placeholder="Descrição da unidade"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Telefone">
                    <b-input
                        v-model="editUN.phone"
                        placeholder="Telefone da unidade de negócio"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Número de pessoas">
                    <b-input
                        v-model="editUN.people_number"
                        placeholder="Número de pessoas da unidade"
                        required>
                    </b-input>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="edition = false">Cancelar</button>
                    <button class="button is-primary" @click="updateUnit">Atualizar</button>
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
    achievementSelected: false,
    selected: null,
    createUN: false,
    selectedUN: false,
    edition: false,
    unit: {
      achievement_id: '',
      name: '',
      description: '',
      phone: '',
      people_number: ''
    },
    editUN: {},
    bordered: true,
    columns: [
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
    const id = this.$store.state.authUser.id
    const achievements = await this.$axios.$get(`/api/sponsor-achivements/${id}`)
    this.achievements = achievements
    this.loggedUser = this.$store.state.authUser
  },

  methods: {
    async chargeAchievement (id) {
      const achievement = await this.$axios.$get(`api/achievements/${id}`)
      this.selected = achievement
      this.achievementSelected = true
    },

    async createUnit () {
      this.unit.achievement_id = this.selected.id
      await this.$axios.$post(`api/units`, this.unit)
    },

    editUnit () {
      Object.assign(this.editUN, this.selectedUN)
      this.edition = true
    },

    async updateUnit () {
      const {id} = this.editUN
      await this.$axios.$put(`api/units/${id}`, this.editUN)
    },

    async deleteUnit () {
      const {id} = this.selectedUN

      await this.$axios.$delete(`api/units/${id}`)
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
