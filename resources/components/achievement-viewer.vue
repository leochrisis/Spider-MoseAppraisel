<template>
  <div>
    <nav class="navbar is-ligthGray">
      <div class="navbar-start">
        <div class="navbar-item title">
          {{achievement.name}}
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="profile === 2" class="buttons">
            <button class="button is-warning" @click="editAchievement">Editar</button>
            <button class="button is-danger" @click="deleteAchievement">Deletar</button>
          </div>
        </div>
      </div>
    </nav>
    <nav class="level">
      <div class="level-item has-text-centered column is-2">
        <p class="heading">Patrocinador</p>
        <div v-if="achievement.sponsor">
          <p>
            {{achievement.sponsor.username}}
          </p>
        </div>
        <div v-else>
          <p>
            O Empreendimento não possui patrocinador.
            <a @click="">Clique aqui para cadastra-lo</a>
          </p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">CNPJ</p>
          <p>{{achievement.cnpj}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Telefone</p>
          <p>{{achievement.phone}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Endereço</p>
          <p>{{achievement.adress}}</p>
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
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Number,
      required: true
    },

    achievement: {
      type: Object,
      default: {}
    },

    editAchievement: {
      type: Function,
      default: () => ({})
    },

    deleteAchievement: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>
