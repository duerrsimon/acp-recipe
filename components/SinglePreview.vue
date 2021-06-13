<template>
  <div class="inline-block">
    <NuxtLink :to="localePath('/recipe/' + slug)">
      <!--//:to="'/recipe/' + slug"-->
      <div
        class="
          w-64
          h-64
          max-w-xs
          overflow-hidden
          rounded-lg
          shadow-md
          bg-white
          hover:shadow-xl
          transition-shadow
          duration-300
          ease-in-out
        "
      >
        <div
          class="relative h-32 bg-cover bg-center"
          :style="'background-image: url(\'' + recipe.image.httpUrl + '\')'"
        >
          <!-- <div
            class="
              absolute
              bottom-0
              right-0
              m-3
              bg-white
              h-8
              w-8
              flex
              items-center
              justify-center
              rounded-full
            "
          >
             <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg> 
          </div> -->
        </div>
        <div class="my-1 px-2">
          <p class="font-semibold my-2" v-html="recipe.title"></p>
          <div class="flex space-x-2 text-gray-400 text-sm items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{{ formatTime(recipe.time) }}</p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <div
              v-for="cat in recipe.categoryIds"
              :key="cat.title"
              class="inline"
            >
              <p>
                <span>{{ $t('category.' + cat) }} </span>
                <!-- <span v-if="i + 1 < recipe.categoryIds.length">,</span> -->
              </p>
            </div>
          </div>

          <div class="mt-3">
            <p
              v-if="CommonIngredients.length > 0"
              class="text-xs text-gray-400"
            >
              {{ $t('with') }}
              <span
                v-for="id in CommonIngredients"
                :key="'ing' + id"
                class="bg-gray-100 mx-1 p-1"
              >
                {{ recipe.ingredientIds[id] }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script>
export default {
  props: ['recipe', 'slug', 'categories'],
  computed: {
    lang() {
      return this.$i18n.locale
    },
    selectedItems() {
      return this.$store.state.selectedIngredients
    },
    CommonIngredients() {
      if (this.recipe.ingredientIds) {
        const ingredientIds = Object.keys(this.recipe.ingredientIds).map(Number)
        return ingredientIds.filter((item) => this.selectedItems.includes(item))
      }
      return []
    },
  },
  methods: {
    formatTime(time) {
      const splitTime = time.split(':')
      if (parseInt(splitTime[0]) > 0) {
        return parseInt(splitTime[0]) + ' h ' + parseInt(splitTime[1]) + ' min '
      }
      return parseInt(splitTime[1]) + ' min'
    },
  },
}
</script>
