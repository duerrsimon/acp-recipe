<template>
  <div class="mt-8 px-4">
    <h2 class="font-bold text-lg">{{ $t('panierthisweek') }}</h2>
    <div class="mt-2 flex flex-wrap text-sm" v-if="basket && selectedItems">
      <button
        v-for="item in basket.ingredientList"
        :key="item.ingredient.id"
        class="m-1 text-white p-2 rounded-lg leading-none flex items-center"
        @click="addOrRemove(item.ingredient.id)"
        :class="[
          {
            'bg-darkmulegreen opacity-100': selectedItems.includes(
              item.ingredient.id
            ),
          },
          'bg-gray-600 opacity-50',
        ]"
      >
        {{ item.ingredient.title }}
        <span
          class="bg-white p-1 rounded text-xs ml-2"
          :class="[
            { 'text-green-600': selectedItems.includes(item.ingredient.id) },
            'text-gray-600',
          ]"
          >{{ item.quantity }} {{ item.unit.abbreviation }}</span
        >
      </button>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      // selectedItems: [],
    }
  },
  // async fetch() {
  //   this.basket = await fetch('http://acp.test/paniers/').then((res) =>
  //     res.json()
  //   )
  // },
  computed: {
    basket() {
      return this.$store.state.panier
    },
    selectedItems() {
      return this.$store.state.selectedIngredients
    },
  },
  methods: {
    addOrRemove(value) {
      const index = this.selectedItems.indexOf(value)
      if (index === -1) {
        this.$store.commit('addSelectedIngredients', value)
      } else {
        this.$store.commit('removeSelectedIngredients', value)
      }
    },
  },
  mounted() {
    // this.recursivelyFindProp(this.basket, 'id')
  },
}
</script>
