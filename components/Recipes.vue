<template>
  <div class="bg-gray-50 mt-4">
    <div class="py-4 px-4">
      <h2 class="font-bold text-lg">{{ $t('suggestions') }}</h2>

      <div class="rounded">
        <!-- Tabs -->
        <ul id="tabs" class="inline-flex w-full px-1 pt-2">
          <li
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-2 text-gray-800 rounded-t opacity-50"
            :class="{
              'text-gray-900 border-b-2 border-green-800': selectedCat == cat,
            }"
          >
            <button @click="selectedCat = cat">{{ cat }}</button>
          </li>
        </ul>
      </div>
      <div class="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
        <div class="flex flex-nowrap space-x-2">
          <SinglePreview
            v-for="recipe in filteredRecipes"
            :recipe="recipe"
            :key="recipe.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filteredRecipes() {
      const that = this
      if (this.selectedCat === 'All') {
        return this.recipes
      }
      return this.recipes.filter((recipe) =>
        recipe.categories.includes(that.selectedCat)
      )
    },
  },
  data() {
    return {
      categories: ['All', 'Quick', 'Exotique', 'Vegan'],
      selectedCat: 'All',
      recipes: [
        {
          title: 'Salade Roquette Quinoa',
          time: '30 min',
          categories: ['Vegan'],
          img: 'https://images.unsplash.com/photo-1601312539737-ba231b8fee5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        },
        {
          title: 'Pide turqois',
          time: '2h 30 min',
          categories: ['Vegetarian'],
          img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          title: 'Epinard quiche',
          time: '20 min',
          categories: ['Vegan', 'Quick'],
          img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        },
        {
          title: 'Poelee de navet',
          time: '30 min',
          categories: ['Vegetarian'],
          img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        },
        {
          title: 'Chimichurri',
          time: '45 min',
          categories: ['Vegetarian', 'Exotique'],
          img: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
      ],
    }
  },
}
</script>
