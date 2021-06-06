<template>
  <div class="container">
    <Menu />
    <Basket />
    <Recipes />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async getPanier() {
      await this.$store.dispatch('getPanier')
    },
  },

  mounted() {
    this.getPanier()
  },
}
</script>

<style>
@import url('https://rsms.me/inter/inter.css');
html {
  font-family: 'Inter', sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: 'Inter var', sans-serif;
  }
}
</style>
