<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Mapa de calor
        </h1>
      </div>
    </section>
    <div class="column is-four-fifths is-offset-1 upper">
      <b-table :data="data" :columns="columns"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'basic',

  async created () {
    const id = this.$route.params.id
    const evaluation = await this.$axios.$get(`/api/evaluations/${id}`)
    this.evaluation = evaluation
  },

  data: () => ({
    evaluation: null,
    data: [
      {'dimensão': 'Talento humano', '1': 'amarelo', '2': 'verde', '3': 'verde', '4':'azul', '5': 'vermelho', 'resultado': 'vermelho'},
      {'dimensão': 'Gestão e qualidade', '1': 'amarelo', '2': 'verde', '3': 'verde', '4':'azul', '5': 'vermelho', 'resultado': 'vermelho'},
      {'dimensão': 'Cliente e mercado', '1': 'amarelo', '2': 'verde', '3': 'verde', '4':'azul', '5':' vermelho', 'resultado': 'vermelho', '1': 'verde', '2': 'verde', '3': 'amarelo', '4': 'azul', '5': 'vermelho', 'resultado': 'amarelo'},
      {'dimensão': 'Inovação', '1': 'amarelo', '2': 'verde', '3': 'verde', '4':'azul', '5':'vermelho', 'resultado': 'vermelho'},
      {'dimensão': 'Sociedade e sustentabilidade', '1': 'verde', '2': 'verde', '3': 'verde', '4':'azul', '5':'azul', 'resultado': 'azul'},
      {'dimensão': 'resultado Final', 'resultado': 'vermelho'}
    ],

    columns: [
      {
        field: 'dimensão',
        label: 'Dimensão',
        width: '40'
      },
      {
        field: '1',
        label: '1',
        width: '40'
      },
      {
        field: '2',
        label: '2',
        width: '40'
      },
      {
        field: '3',
        label: '3',
        width: '40'
      },
      {
        field: '4',
        label: '4',
        width: '40'
      },
      {
        field: '5',
        label: '5',
        width: '40'
      },
      {
        field: 'resultado',
        label: 'resultado',
        width: '40'
      }
    ]
  })
}
</script>

<style>
.upper {
  padding-top: 30px;
}
</style>
