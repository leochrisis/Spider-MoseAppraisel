<template>
  <div>
    <div class="columns">

      <div class="column is-one-fifth">
        <sideBar
          :profile="2"
          :achievements="achievements"
          :charge-achievement="(id) => chargeAchievement(id)"
          :create-achievement="() => achievementCreation()"
        ></sideBar>
      </div>

      <div class="column">
        <div v-if="!achievementSelected">
          Escolha um empreendimento para começar.
        </div>

        <div v-else>
          <achievementItem
            :profile="2"
            :achievement="selected"
            :edit-achievement="editAchievement"
            :delete-achievement="deleteAchievement"
          ></achievementItem>
          <br/>
          <div v-if="!selected.units.length > 0">
            Ainda não existem unidades de negócio.
          </div>
          <div v-else>
            <b-table
              :bordered="bordered"
              :data="selected.units"
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
                        type="password"
                        v-model="user.password"
                        placeholder="Senha do usuário"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Confime a senha">
                    <b-input
                        type="password"
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
import { mapGetters } from 'vuex'
import sideBar from '~/components/side-bar.vue'
import achievementItem from '~/components/achievement-viewer.vue'

export default {
  layout: 'basic',

  components: { sideBar, achievementItem },

  data: () => ({
    achievements: [],
    patrocinator: null,
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
      password: '',
      profiles: [3]
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
    ],
    newUser: false,
    passwordConfirme: ''
  }),

  computed: {
    ...mapGetters(['loggedUser'])
  },

  created () {
    this.loadAchievements()
  },

  methods: {
    async loadAchievements () {
      const id = this.$store.state.authUser.id
      const achievements = await this.$axios.$get(`/api/valuer-achivements/${id}`)
      this.achievements = achievements
    },

    achievementCreation () {
      this.achievement.name = ''
      this.achievement.cnpj = ''
      this.achievement.adress = ''
      this.achievement.phone = ''
      this.creation = true
    },

    async createAchievement () {
      const data = {
        name: this.achievement.name,
        cnpj: this.achievement.cnpj,
        phone: this.achievement.phone,
        adress: this.achievement.adress,
        valuerId: this.loggedUser.id
      }

      await this.$axios.$post('api/achievements', data)
        .then()
        .catch()
    },

    async chargeAchievement (id) {
      const achievement = await this.$axios.$get(`api/achievements/${id}`)
      this.selected = achievement

      if (achievement.sponsorId) {
        const sponsorId = achievement.sponsorId
        const sponsor = await this.$axios.$get(`api/users/${sponsorId}`)
        this.patrocinator = sponsor
      }

      this.achievementSelected = true
      this.loadAchievements()
    },

    editAchievement () {
      Object.assign(this.edited, this.selected)
      this.editing = true
    },

    async updateAchievement () {
      const {id} = this.edited
      await this.$axios.$put(`api/achievements/${id}`, this.edited)
      this.selected = this.edited
    },

    async deleteAchievement () {
      const {id} = this.selected
      await this.$axios.$delete(`api/achievements/${id}`)
      this.achievementSelected = false
      this.loadAchievements()
    },

    async createUSer () {
      if (this.user.password === this.passwordConfirme) {
        const id = await this.$axios.$post('api/users', this.user)
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
