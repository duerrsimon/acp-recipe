<template>
  <div class="bg-gray-50 mt-4">
    <div class="py-4 px-4">
      <h2 class="font-bold text-lg">{{ $t('suggestions') }}</h2>
      <div class="rounded">
        <ul id="tabs" class="inline-flex w-full px-1 pt-2">
          <li
            v-for="cat in categories"
            :key="cat"
            class="
              px-4
              py-2
              text-gray-800
              rounded-t
              opacity-50
              focus:outline-none
            "
            :class="{
              'text-gray-900 border-b-2 border-green-800': selectedCat == cat,
            }"
          >
            <button class="focus:outline-none" @click="selectedCat = cat">
              {{ $t('category.' + cat) }}
            </button>
          </li>
        </ul>
      </div>
      <div class="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
        <div class="flex flex-nowrap space-x-2">
          <SinglePreview
            v-for="recipe in filteredRecipes"
            :key="recipe[0]"
            :recipe="recipe[1]"
            :slug="recipe[0]"
          />
        </div>
        <NoRecipes v-if="filteredRecipes.length == 0" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable unicorn/escape-case */
/* eslint-disable no-useless-escape */

export default {
  data() {
    return {
      categories: ['all', '1033', '1058', '1034', '1158'],
      selectedCat: 'all',
    }
  },
  computed: {
    filteredRecipes() {
      const that = this
      if (this.recipes !== null) {
        if (this.selectedCat === 'all') {
          return Object.entries(this.recipes)
        }
        return Object.entries(this.recipes).filter((recipe) =>
          recipe[1].categoryIds.includes(parseInt(that.selectedCat))
        )
      }
      return []
    },

    recipes() {
      return this.$store.state.recipes
    },
  },
}
</script>
