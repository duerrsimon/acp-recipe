<template>
  <div class="w-full">
    <!-- <Menu /> -->
    <div class="relative">
      <div class="absolute top-0 left-0 z-50 ml-4 mt-4">
        <NuxtLink :to="localePath('/')">
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
        </NuxtLink>
      </div>
      <div
        v-if="recipie"
        class="relative bg-cover bg-center z-0 bg-mulegreen"
        :class="[{ 'h-64': recipie.image != '' }, 'h-36']"
        :style="'background-image: url(' + recipie.image.httpUrl + ')'"
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
        <p class="font-semibold my-2 text-2xl" v-html="recipie.title"></p>
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
          <p>{{ formatTime(recipie.time) }}</p>

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
          <span v-for="cat in recipie.category" :key="cat.id">{{
            cat.title
          }}</span>
        </div>
        <div class="mt-3">
          <p class="text-xs text-gray-400" v-if="CommonIngredients.length > 0">
            {{ $t('with') }}
            <span v-for="id in CommonIngredients" :key="'ing' + id">
              {{ ingredients[id] }}
            </span>
          </p>
        </div>
        <div>
          {{ recipie.hint }}
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
                  type="number"
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
                  name="custom-input-number"
                  v-model="nPersons"
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
          <!-- Tabs -->
          <div class="inline-flex space-x-4 w-full px-1 pt-2">
            <button
              class="w-1/2 px-4 py-2 text-gray-800 rounded-t"
              :class="{
                'border-b-2 border-darkmulegreen': show == 'ingredients',
              }"
              @click="show = 'ingredients'"
            >
              {{ $t('ingredients') }}
            </button>
            <button
              class="w-1/2 px-4 py-2 -mb-px text-black rounded-t"
              :class="{
                'border-b-2 border-darkmulegreen': show == 'recipe',
              }"
              @click="show = 'recipe'"
            >
              {{ $t('instructions') }}
            </button>
          </div>
        </div>
        <div class="relative mt-16 mx-8" v-if="show == 'ingredients'">
          <div v-for="(group, i) in recipie.ingredients" :key="group.title + i">
            <h2 class="font-medium my-3 text-xl">{{ group.title }}</h2>

            <table class="w-full mx-auto text-lg">
              <tr
                v-for="(ingredient, i) in group.ingredientList"
                :key="group.title + '_' + ingredient.ingredient.title + i"
                class="w-full"
              >
                <td class="w-1/3">
                  <span>{{
                    (parseFloat(ingredient.quantity) /
                      parseInt(recipie.defaultPersons)) *
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

                  <span>{{ ingredient.hint }}</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="pb-8">
          <div class="relative" v-if="show == 'recipe'">
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
                class="mb-4"
                v-for="(step, i) in recipie.steps"
                :key="step.title + i"
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
                    :title="step.title"
                    :time="step.time"
                    v-if="step.time"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="recipie.related.length > 0">
          <h3 class="text-xl font-medium my-4">Related recipes</h3>
          <div class="flex w-full pb-10 hide-scroll-bar mt-4">
            <div class="w-1/2">
              <SinglePreview
                :recipe="recipe"
                :slug="key"
                v-for="(recipe, key) in recipie.related"
                :key="key"
              />
            </div>
          </div>
        </div>
        <div class="my-6">
          <!-- <h6 class="font-medium text-sm">Copyright and Info</h6> -->
          <ul class="text-xs text-gray-800">
            <li>{{ $t('createdby') }} {{ recipie.creator }}</li>
            <li>Text <a href="">CC BY SA 4.0</a></li>
            <li>
              {{ $t('imageby') }}
              <a :href="recipie.image.creator_url">{{
                recipie.image.creator
              }}</a>
              {{ $t('licensedunder') }}
              <a href="">{{ recipie.image.license }}</a>
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
    const slug = params.recipe // When calling /abc the slug will be "abc"
    const recipie = await fetch(
      'http://acp.test/recipes/' + params.recipe + '/' + i18n.locale + '/'
    ).then((res) => res.json())
    console.log(recipie)
    const ingredientIds = Object.keys(recipie.ingredientIds).map(Number)
    const ingredients = recipie.ingredientIds
    const nPersons = recipie.defaultPersons
    return { slug, recipie, nPersons, ingredientIds, ingredients }
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
      // return this.selectedItems.some((item) =>
      //   this.ingredientIds.includes(item)
      // )
      return this.ingredientIds.filter((item) =>
        this.selectedItems.includes(item)
      )
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
    changeNPersons(step) {
      if (this.nPersons + step > 0) {
        this.nPersons = this.nPersons + step
      }
    },
  },
  mounted() {
    this.nPersons = this.recipie.defaultPersons
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
