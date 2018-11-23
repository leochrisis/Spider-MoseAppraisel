<template>
  <div>
    <nav class="navbar is-ligthGray">
      <div class="navbar-start">
        <div class="navbar-item title">
          {{unit.name}}
        </div>
      </div>
    </nav>

    <nav class="level">
      <div v-if="profile === 2 || 3" class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Responsável</p>
          <div v-if="unit.responsible">
            <p>
              {{unit.responsible.username}}
            </p>
          </div>
          <div v-else>
            <p>
              O Unidade não possui um responsável.
              <a @click="">Clique aqui para cadastra-lo</a>
            </p>
          </div>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">descrição</p>
          <p>{{unit.description}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Telefone</p>
          <p>{{unit.phone}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered column is-2">
        <div>
          <p class="heading">Número de membros</p>
          <p>{{unit.people_number}}</p>
        </div>
      </div>
    </nav>

    <!--<div v-if="profile === 3" class="buttons">
      <a class="button is-info" @click="creation = true">cadastrar membro</a>
      <a class="button is-info" @click="cadastrate = true">cadastrar fonte de evidência</a>
    </div>-->
    <br/>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Number,
      required: true
    },

    unit: {
      type: Object,
      default: {}
    },
  }
}
</script>
