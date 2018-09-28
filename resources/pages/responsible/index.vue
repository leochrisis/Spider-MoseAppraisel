<template>
  <div>
    olá
  </div>
</template>

<script>
export default {
  layout: 'basic',

  data: () => ({
    units: []
  }),

  async created () {
    const units = await this.$axios.$get('/api/units')
    this.units = units
  },

  methods: {}
}
</script>
