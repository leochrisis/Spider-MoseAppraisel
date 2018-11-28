<template>
  <div>
    <div class="columns">
      <!--Side bar-->
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
            <!--<ul>
              <div v-for="(unit, i) in units" :key="unit.id">
                <li><a @click="selectUnit(unit, i)">{{unit.name}}</a></li>
              </div>
            </ul> -->
          </ul>
        </aside>
      </div>

      <div class="column is-three-quarters">
        <section class="hero">
          <div class="hero-body">
            <h1 class="title">
              Avaliaçao
            </h1>
          </div>
          <div v-if="evaluation.results" class="navbar-end">
            <nuxt-link to="`/improvement/${evaluation.id}/`">
              Plano de melhoria
            </nuxt-link>
          </div>
        </section>
        </br>
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              Objetivos da competência
            </p>
            <a class="card-header-icon">
              <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <b-collapse class="card" @open="chargeEvidences('TH 1')">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  Talento Humano
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
              <div class="card-content">
                <th>
                  TH1 - Papéis e responsabilidades dos colaboradores são
                  definidos, comunicados e aprovados.
                  <section>
                    <a v-if="evidences.length > 0"
                      class="button is-small"
                      @click="seeEvidence = true">
                        Vizualizar evidências
                    </a>
                    <a class="button is-small" @click="setPractice('TH 1')">Adicionar evidências</a>
                  </section>
                </th>
              </div>
            </b-collapse>

            <b-collapse class="card">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  Gestão e qualidade
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </b-collapse>

            <b-collapse class="card">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  Cliente e mercado
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </b-collapse>

            <b-collapse class="card">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  Inovação
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </b-collapse>

            <b-collapse class="card">
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  Sociedade e sustentabilidade
                </p>
                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </b-collapse>
          </div>
        </b-collapse>
      </div>
    </div>

    <div v-if="addEvidence">
        <b-modal :active.sync="addEvidence" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Cadastro de evidência</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Prática">
                    <b-dropdown disabled>
                      <button class="button" slot="trigger">
                          <span>{{evidence.practice}}</span>
                          <b-icon icon="menu-down"></b-icon>
                      </button>
                    </b-dropdown>
                  </b-field>

                  <b-field label="Url">
                    <b-input
                        v-model="evidence.url"
                        placeholder="url"
                        required>
                    </b-input>
                  </b-field>

                  <b-field label="Quem fornece essa evidência?">
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

                  <b-field label="Qual o papel desse membro?">
                    <b-autocomplete
                      rounded
                      v-model="role"
                      :data="filteredFontObj"
                      placeholder="Insira o nome da fonte de evidência"
                      icon="magnify"
                      field="role"
                      @select="option => font = option">
                    </b-autocomplete>
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="addEvidence = false">Cancelar</button>
                    <button class="button is-primary" @click="createEvidence">Cadastrar</button>
                </footer>
            </div>
          </form>
        </b-modal>
      </div>

       <div v-if="seeEvidence">
        <b-modal :active.sync="seeEvidence" has-modal-card>
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Evidencias cadastradas</p>
            </header>
            <section class="modal-card-body">
              <div <div v-for="evidence in evidences">
                <a :href="evidence.url">{{evidence.url}}</a>
                <a class="button is-small">excluir</a>
              </div>
            </section>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  computed: {
    loggedUser () {
      this.$store.state.authUser.id
    },

    filteredMemberObj () {
      return this.members.filter((option) => {
        return option.username
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    },

    filteredFontObj () {
      return this.evidenceFonts.filter((option) => {
        return option.role
          .toString()
          .toLowerCase()
          .indexOf(this.role.toLowerCase()) >= 0
      })
    }
  },

  async created () {
    const id = this.$route.params.id
    const evaluation = await this.$axios.$get(`/api/evaluations/${id}`)
    this.evaluation = evaluation

    const unitId = this.evaluation.unitId
    const unit = await this.$axios.$get(`/api/units/${unitId}`)
    this.evidenceFonts = unit.evidenceFonts
    this.membersId = unit.members

    const team = await this.$axios.$get(`/api/unit-id/${unitId}`)
    this.team = team
    this.chargeMembers()
  },

  data: () => ({
    members: [],
    membersId: [],
    evidences: [],
    evidenceFonts: [],
    evaluation: {},
    evidence: {
      url: '',
      practice: ''
    },
    fontId: null,
    member: null,
    name: '',
    role: '',
    addEvidence: false,
    evidenceFont: null,
    font: '',
    seeEvidence: false,
    team: []
  }),

  methods: {
    async chargeMembers () {
      this.members = []
      for (var i = 0; i < this.membersId.length; i++) {
        var user = await this.$axios.$get(`/api/users/${this.membersId[i].userId}`)
        this.members.push(user)
      }
    },

    async chargeEvidences (practice) {
      const data = {
        evaluationId: this.evaluation.id,
        practice: practice
      }

      const evidences = await this.$axios.$post('/api/per-practice/', data)
      this.evidences = evidences
    },

    async createEvidence () {
      const evidence = {
        url: this.evidence.url,
        practice: this.evidence.practice,
        evaluationId: this.evaluation.id
      }

      await this.$axios.$post('api/evidences', evidence)

      this.memberRoleRelate()
    },

    async memberRoleRelate () {
      for (var i = 0; i < this.team.length; i++) {
        if (this.team[i].userId === this.member.id) {
          const data = {
            memberId: this.team[i].id,
            evidenceFontId: this.font.id,
            evaluationId: this.evaluation.id
          }
          await this.$axios.$post('api/member-role', data)
        }
      }
    },

    setPractice (practice) {
      this.evidence.practice = practice
      this.addEvidence = true
    }
  }
}
</script>

<style>
.button {
  padding: 4px;
  display: inline-flex
}
</style>
