<template>
  <div>
    <nav class="navbar is-info">
      <!-- navbar brand, navbar menu... -->
      <div class="navbar-start">
        <a class="navbar-item">
          MOSE
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              Home
            </p>
            <p class="control">
              About
            </p>
            <p class="control">
              Features
            </p>
            <p class="control">
              About us
            </p>
          </div>
        </div>
      </div>
    </nav> 
    <nuxt/>
  </div>
</template>

<script>
import logoMose from '~/assets/img/mose-logo.png'

export default {
  data: () => ({
    logoMose
  })
}
</script>

<style scoped>
.moseLogo {
  max-width: 40px
}
</style>
