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
                  <p class="title is-4">{{loggedUser.username}}</p>
                  <p class="subtitle is-6">@{{loggedUser.username}}</p>
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

      <!--Application screen-->
      <div class="column">
        <div v-if="!selectedUnit">
          Escolha uma unidade de negócio para começar.
        </div>

        <div v-else>
          <unitViewer
            :profile="3"
            :unit="selectedUnit"
          >
          </unitViewer>

          <div class="buttons">
            <a class="button is-info" @click="openUserModal = true">cadastrar membro</a>
            <a class="button is-info" @click="EvidenceFontModal('creation')">cadastrar fonte de evidência</a>
          </div>
          <br/>

          <nav class="navbar is-transparent tabs">
            <div class="container">
              <ul>
                <li><a @click="chargeEvaluations">Avaliações</a></li>
                <li><a @click="chargeMembers">Membros</a></li>
                <li><a @click="chargeEvidences">Fontes de evidência</a></li>
              </ul>
            </div>
          </nav>

            <!--Evaluations-->
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
                        <div v-if="selectedUn.status === 'Vigente'">
                          <nuxt-link class="button" :to="`/responsible/evidences/${selectedUn.id}`">
                            Evidências
                          </nuxt-link>
                          <a class="button" @click="term = true">Acordo de confidencialidade</a>
                        </div>
                        <div v-else>
                          <button class="button" @click="">Plano de melhoria</button>
                          <button class="button">Resultado</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div v-if="selectedUnit.evaluations.length === 0">
                Ainda não existem avaliações.
              </div>
              <div v-else>
                <b-table
                  :data="selectedUnit.evaluations"
                  :columns="columns"
                  :selected.sync="selectedUn"
                  focusable
                ></b-table>
              </div>
            </div>

            <!--Evidence Font-->
            <div v-if="evidences">
              <nav class="navbar is-transparent">
                <div class="navbar-start">
                  <div class="navbar-item title">
                    Fonte de evidência
                  </div>
                </div>
                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <div v-if="selectedEv">
                        <button class="button is-warning" @click="EvidenceFontModal('edition')">Editar</button>
                        <button class="button is-danger" @click="deleteEvidence">Deletar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div v-if="selectedUnit.evidenceFonts.length === 0">
                Ainda não existem fontes de evidências.
              </div>
              <div v-else>
                <b-table
                  :data="selectedUnit.evidenceFonts"
                  :columns="columnsEv"
                  :selected.sync="selectedEv"
                  focusable
                ></b-table>
              </div>
            </div>

            <!--Members-->
             <div v-if="members">
              <nav class="navbar is-transparent">
                <div class="navbar-start">
                  <div class="navbar-item title">
                    Membros
                  </div>
                </div>
                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <div v-if="selectedME">
                        <button class="button is-warning" @click="">Editar</button>
                        <button class="button is-danger" @click="">Deletar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div v-if="selectedUnit.members.length === 0">
                Ainda não existem membros.
              </div>
              <div v-else>
                <b-table
                  :data="memberList"
                  :columns="columnsMe"
                  :selected.sync="selectedME"
                  focusable
                ></b-table>
              </div>
            </div>
          </div>
      </div>
    </div>

    <section>
      <!--Using user registration modal component, you can see it on the file imports -->
      <div v-if="openUserModal">
        <userRegister
          :activate="!!openUserModal"
          :profile="profiles.team"
          :create-user="(user, confirmPassword) => submitUser(user, confirmPassword)"
          :on-close="closeUserModal"
        >
        </userRegister>
      </div>

      <div v-if="openEvidenceFontModal">
        <evidenceFontModal
          :activate="!!openEvidenceFontModal"
          :evidence-font-sended="evidence"
          :create-evidence="(evidenceFont) => submitEvidenceFont(evidenceFont)"
          :on-close="closeEvidenceFontModal"
        >
        </evidenceFontModal>
      </div>

      <div v-if="editionEv">
        <b-modal :active.sync="editionEv" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edição de evidência</p>
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
      <div v-if="term">
        <b-modal :active.sync="term" has-modal-card>
          <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Acordo de confidencialidade</p>
                </header>
                <section class="modal-card-body">
                  <p>
                    A  unidade de negócio {{selectedUnit.name}} está executando
                    uma avaliação de contexto segundo o método de avaliação MOSE SM ®.
                    Com o intuito dar maior liberdade aos entrevistados e de preservar o
                    negócio do empreendimento avaliado será acordado:
                  </p>
                  <p>
                    1. Todas as informações registradas durante a avaliação, tais como
                    questionários, discussões, entrevistas serão tratados pelo líder da avaliação e
                    pela equipe de avaliação (se houver) com confidencialidade e não serão
                    reportados para outros que não pertençam a equipe de avaliação;
                  </p>
                  <p>
                    2. Todos os participantes da avaliação (membros da equipe de avaliação,
                    pessoas que forem entrevistadas e patrocinador) concordam de não discutir
                    as informações compartilhadas com outras pessoas;
                  </p>
                  <p>
                    3. Todos os resultados da avaliação (exemplo: Relatório de
                    Inconsistências, Relatório de Achados, entre outros) serão documentados e
                    apresentados sem atribuição a indivíduos específicos;
                  </p>
                  <p>
                    4. Todos os resultados da avaliação são de propriedade do patrocinador
                    e não pode ser compartilhados sem que seja autorizado por ele.
                  </p>

                    Nós abaixo assinados entendemos e concordamos com as cláusulas acima
                    descritas.
                  </p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="term = false">Cancelar</button>
                    <button class="button is-primary" @click="">Concordar</button>
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
import profiles from '~/static/profiles.json'
import sideBar from '~/components/side-bar.vue'
import unitViewer from '~/components/unit-viewer.vue'
import userRegister from '~/components/user-register-modal.vue'
import evidenceFontModal from '~/components/evidence-font-modal.vue'

export default {
  name: 'responsibleIndex',

  layout: 'basic',

  components: { sideBar, unitViewer, userRegister, evidenceFontModal },

  data: () => ({
    units: [],
    selectedUnit: false,
    selectedUn: false,
    profiles: profiles,
    selectedEv: false,
    editionEv: false,
    selectedME: false,
    term: false,
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
        label: 'Habilidades',
        centered: true
      }
    ],
    columnsMe: [
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
    openUserModal: false,
    openEvidenceFontModal: false,
    evidence: {},
    evidences: {
      role: '',
      skills: ''
    },
    evaluations: true,
    members: false,
    editionEv: false,
    memberList: [],
    type: ''
  }),

  async created () {
    // Get all unit related to logged responsible
    const id = this.loggedUser.id
    const units = await this.$axios.$get(`/api/responsible-units/${id}`)
    this.units = units
  },

  computed: {
    // This get the logged user on application
    ...mapGetters(['loggedUser']),

    // Funtion to return constantly unit's id when it's selected by application's user
    unitId () {
      return this.selectedUnit.id
    }
  },

  methods: {
    // Unit selector, just set evidences and evaluations to change units view context
    selectUnit (unit) {
      this.selectedUnit = unit
      this.selectedUn = false
      this.evidences = false
      this.evaluations = true
    },

    // This is used to close user resgiter modal
    closeUserModal () {
      this.openUserModal = false
    },

    async submitUser (newUser, confirmPassword) {
      newUser.profiles = [profiles.team.id]

      if (newUser.password === confirmPassword) {
        const user = await this.$axios.$post('api/users', newUser)
        const updates = { members: [user.id] }

        await this.$axios.$put(`api/units/${this.unitId}`, updates)
          .then(this.handleUserRegisterSucess)
          .catch(this.handleUserRegisterFail)

      } else {
        this.$toast.open({
          message: 'As senhas não correspondem, tente novamente.',
          duration: 5000,
          position: 'is-bottom-right',
          type: 'is-danger'
        })
      }
    },

    handleUserRegisterSucess () {
      this.$toast.open({
        message: 'Membro registrado com sucesso.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-success'
      })
      this.openUserModal = false
    },

    handleUserRegisterFail () {
      this.$toast.open({
        message: 'Falha ao registrar usuário. Verifique os dados e tente novamente.',
        duration: 5000,
        position: 'is-bottom-right',
        type: 'is-danger'
      })
    },

    EvidenceFontModal (type) {
      this.openEvidenceFontModal = true
      this.type = type
    },

    closeEvidenceFontModal () {
      this.openEvidenceFontModal = false
    },

    async submitEvidenceFont (evidenceFont) {
      console.log(evidenceFont)
      /*evidenceFont.unitId = this.unitId
      await this.$axios.$post('api/evidences-font', evidenceFont)*/
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

    async chargeMembers () {
      this.memberList = []
      if (this.selectedUnit.members.length > 0) {
        for (var i = 0; i < this.selectedUnit.members.length; i++) {
          var id = this.selectedUnit.members[i].userId
          var member = await this.$axios.$get(`/api/users/${id}`)
          this.memberList.push(member)
        }
      }
      this.evidences = false
      this.evaluations = false
      this.members = true
      this.selectedUn = false
    },

    async updateEvidence () {
      const {id} = this.selectedEv

      await this.$axios.$put(`api/evidences-font/${id}`, this.selectedEv)
    },

    async deleteEvidence () {
      const {id} = this.selectedEv

      await this.$axios.$delete(`api/evidences-font/${id}`)
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
