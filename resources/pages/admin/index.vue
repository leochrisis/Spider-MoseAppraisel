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
          <ul class="menu-list gray">
            <li><a>Dashboard</a></li>
            <li><a>Tables</a></li>
            <li><a>Charts</a></li>
            <li><a>Calendar</a></li>
            <li><a>Users</a></li>
            <li></li>
          </ul>
        </aside>
      </div>
      <div class="column is-8 is-offset-1">
        <nav class="navbar is-transparent">
          <div class="navbar-start">
            <div class="navbar-item title">
              Usuários
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button class="button is-info" @click="creation = true">Novo</button>
                <div v-if="selected">
                  <button class="button is-warning" @click="edition = true">Editar</button>
                  <button class="button is-danger" @click="deleteUser">Deletar</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br/>
        <b-table
          :bordered="bordered"
          :data="users"
          :columns="columns"
          :selected.sync="selected"
          focusable
        ></b-table>
      </div>
    </div>

    <section>
      <userRegister
        :activate="!!creation"
        :profile="profiles.valuer"
        :createUser="(user, confirmPassword) => createUser(user, confirmPassword)"
        :onClose="closeuserRegisterModal"
      ></userRegister>

      <div v-if="edition">
        <b-modal :active.sync="edition" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de usuário</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Usuário">
                      <b-input
                          v-model="selected.username"
                          placeholder="Nome de usuário"
                          required>
                      </b-input>
                    </b-field>

                    <b-field label="Email">
                      <b-input
                          type="email"
                          v-model="selected.email"
                          placeholder="Email do usuário"
                          required>
                      </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="edition = false">Cancelar</button>
                    <button class="button is-primary" @click="updateUser">Atualizar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>
    </section>
  </div>
</template>

<script>
import userRegister from '~/components/user-register-modal.vue'
import profiles from '~/static/profiles.json'

export default {
  layout: 'basic',

  components: { userRegister },

  async created () {
    const users = await this.$axios.$get('/api/users')
    this.users = users
  },

  data: () => ({
    users: [],
    selected: null,
    creation: false,
    edition: false,
    bordered: true,
    columns: [
      {
        field: 'id',
        label: 'ID',
        width: '40',
        numeric: true
      },
      {
        field: 'username',
        label: 'Nome de usuário',
        centered: true
      },
      {
        field: 'email',
        label: 'Email',
        centered: true
      }
    ],
    profiles: profiles
  }),

  methods: {
    async createUser ( user, confirmPassword ) {
      if (user.password === confirmPassword) {
        await this.$axios.$post('api/users', this.user)
      }
    },

    async updateUser () {
      const {id} = this.selected

      await this.$axios.$put(`api/users/${id}`, this.selected)
    },

    async deleteUser () {
      const {id} = this.selected

      await this.$axios.$delete(`api/users/${id}`)
    },

    closeuserRegisterModal () {
      this.creation = false
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 30px;
}
.button {
  padding: 5px;
  display: inline-flex
}
</style>
