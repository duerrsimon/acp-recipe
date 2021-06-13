<template>
  <div class="w-full">
    <!-- <Menu /> -->
    <div class="relative">
      <div class="absolute top-0 left-0 z-50 ml-4 mt-4">
        <button @click="goBack()">
          <div class="bg-white rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </button>
      </div>
      <div
        v-if="recipe"
        class="relative bg-cover bg-center z-0 bg-mulegreen"
        :class="[{ 'h-64': recipe.image != '' }, 'h-36']"
        :style="'background-image: url(' + recipe.image.httpUrl + ')'"
      >
        <div
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
            fill="#991b1b"
            viewBox="0 0 24 24"
            stroke="#991b1b"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <div class="relative -mt-12 rounded-3xl pt-4 px-6 bg-white z-10 h-64">
        <p class="font-semibold my-2 text-2xl" v-html="recipe.title"></p>
        <div class="flex space-x-2 text-gray-400 text-lg items-center">
          <!-- svg  -->
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
          <span v-for="cat in recipe.category" :key="cat.id">{{
            cat.title
          }}</span>
        </div>
        <div class="mt-3">
          <p v-if="CommonIngredients.length > 0" class="text-xs text-gray-400">
            {{ $t('with') }}
            <span v-for="id in CommonIngredients" :key="'ing' + id">
              {{ ingredients[id] }}
            </span>
          </p>
        </div>
        <div class="text-base">
          {{ recipe.hint }}
        </div>
        <div class="w-full flex">
          <div class="custom-number-input h-10 w-1/2 mx-auto mt-4">
            <label
              for="custom-input-number"
              class="w-full text-gray-700 text-sm font-semibold hidden"
            >
              {{ $t('numberofpersons') }}
            </label>
            <div
              class="
                flex flex-row
                h-10
                w-full
                justify-between
                rounded-full
                relative
                bg-transparent
                mt-1
                text-2xl
              "
            >
              <button
                data-action="decrement"
                class="
                  border-darkmulegreen border
                  text-darkmulegreen
                  h-10
                  w-10
                  rounded-full
                  cursor-pointer
                  outline-none
                "
                @click="changeNPersons(-1)"
              >
                <span class="m-auto text-2xl">−</span>
              </button>
              <div class="flex flex-col space-y-1">
                <input
                  v-model="nPersons"
                  type="number"
                  name="custom-input-number"
                  disabled
                  aria-disabled="true"
                  class="
                    outline-none
                    w-8
                    mx-auto
                    focus:outline-none
                    text-center text-gray-800
                    font-semibold
                    text-md
                    hover:text-black
                    focus:text-black
                    md:text-basecursor-default
                    flex
                    items-center
                    text-gray-700
                    outline-none
                    m-0
                    p-0
                  "
                />
                <span class="text-xs -mt-4">{{ $t('persons') }}</span>
              </div>

              <button
                data-action="increment"
                class="
                  border-darkmulegreen border
                  text-darkmulegreen
                  h-10
                  w-10
                  rounded-full
                  cursor-pointer
                "
                @click="changeNPersons(+1)"
              >
                <span class="m-auto text-2xl">+</span>
              </button>
            </div>
          </div>
        </div>

        <div class="rounded mt-8 mb-7">
          <div class="inline-flex space-x-4 w-full px-1 pt-2">
            <button
              class="w-1/2 px-4 py-2 text-gray-800 rounded-t"
              :class="{
                'border-b-2 border-darkmulegreen focus:outline-none':
                  show == 'ingredients',
              }"
              @click="show = 'ingredients'"
            >
              {{ $t('ingredients') }}
            </button>
            <button
              class="w-1/2 px-4 py-2 -mb-px text-black rounded-t"
              :class="{
                'border-b-2 border-darkmulegreen focus:outline-none':
                  show == 'recipe',
              }"
              @click="show = 'recipe'"
            >
              {{ $t('instructions') }}
            </button>
          </div>
        </div>
        <div v-if="show == 'ingredients'" class="relative mt-16">
          <div v-for="(group, i) in recipe.ingredients" :key="group.title + i">
            <h2 class="font-medium my-3 text-xl">{{ group.title }}</h2>

            <table class="w-full mx-auto text-lg">
              <tr
                v-for="(ingredient, j) in group.ingredientList"
                :key="group.title + '_' + ingredient.ingredient.title + j"
                class="w-full"
              >
                <td class="w-1/3">
                  <span>{{
                    (parseFloat(ingredient.quantity) /
                      parseInt(recipe.defaultPersons)) *
                    nPersons
                  }}</span>
                  <span>{{ ingredient.unit.abbreviation }}</span>
                </td>
                <td class="w-2/3">
                  <div class="flex items-center space-x-1">
                    <IngredientIcon
                      :id="ingredient.id"
                      :title="ingredient.title"
                    /><span
                      class="w-full"
                      v-html="ingredient.ingredient.title"
                    ></span>
                  </div>

                  <span class="text-xs">{{ ingredient.hint }}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="pb-8">
          <div v-if="show == 'recipe'" class="relative">
            <div
              class="
                border-r-2 border-darkmulegreen border-dotted
                absolute
                h-full
                top-0
              "
              style="left: 15px"
            ></div>
            <ul class="list-none mb-8 p-0">
              <li
                v-for="(step, i) in recipe.steps"
                :key="step.title + i"
                class="mb-4"
              >
                <div class="flex items-center mb-2">
                  <div class="bg-darkmulegreen rounded-full h-8 w-8"></div>
                  <div
                    class="flex-1 ml-4 font-medium"
                    v-html="step.title"
                  ></div>
                </div>
                <div class="ml-12 text-sm" v-html="step.desc"></div>
                <div class="mt-3 relative ml-12">
                  <CookingTimer
                    v-if="step.time"
                    :title="step.title"
                    :time="step.time"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="nRelated != 0">
          <h3 class="text-xl font-medium my-4">Related recipes</h3>
          <div class="flex w-full pb-10 hide-scroll-bar mt-4">
            <div class="w-1/2">
              <SinglePreview
                v-for="(recipe, key) in recipe.related"
                :key="key"
                :slug="key"
                :recipe="recipe"
              />
            </div>
          </div>
        </div>
        <div class="my-6">
          <ul class="text-xs text-gray-800">
            <li>{{ $t('createdby') }} {{ recipe.creator }}</li>
            <li>Text <a href="">CC BY SA 4.0</a></li>
            <li>
              {{ $t('imageby') }}
              <a :href="recipe.image.creator_url">{{ recipe.image.creator }}</a>
              {{ $t('licensedunder') }}
              <a href="">{{ recipe.image.license }}</a>
            </li>
          </ul>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable unicorn/escape-case */
/* eslint-disable no-useless-escape */
/* eslint-disable require-await */
export default {
  async asyncData({ params, i18n }) {
    const slug = params.recipe
    const recipe = await fetch(
      'https://recipes.simonduerr.eu/recipes/' +
        params.recipe +
        '/' +
        i18n.locale +
        '/'
    ).then((res) => res.json())
    const ingredientIds = Object.keys(recipe.ingredientIds).map(Number)
    const ingredients = recipe.ingredientIds
    const nPersons = recipe.defaultPersons
    const nRelated = recipe.related.length
    return { slug, recipe, nPersons, ingredientIds, ingredients, nRelated }
  },
  data() {
    return {
      show: 'ingredients',
      nPersons: null,
    }
  },
  computed: {
    selectedItems() {
      return this.$store.state.selectedIngredients
    },
    CommonIngredients() {
      return this.ingredientIds.filter((item) =>
        this.selectedItems.includes(item)
      )
    },
  },
  mounted() {
    this.nPersons = this.recipe.defaultPersons
  },
  methods: {
    formatTime(time) {
      const splitTime = time.split(':')
      if (parseInt(splitTime[0]) > 0) {
        return parseInt(splitTime[0]) + ' h ' + parseInt(splitTime[1]) + ' min '
      }
      return parseInt(splitTime[1]) + ' min'
    },
    changeNPersons(step) {
      if (this.nPersons + step > 0) {
        this.nPersons = this.nPersons + step
      }
    },
    goBack() {
      // this should probably be a bit smarter
      this.$router.go(-1)
    },
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

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>
