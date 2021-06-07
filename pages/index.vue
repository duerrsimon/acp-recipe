<template>
  <div class="w-full">
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
  computed: {
    selectedItems() {
      return this.$store.state.selectedIngredients
    },
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
