<template>
  <div class="container">
    <!-- <Menu /> -->
    <div class="relative">
      <div class="absolute top-0 left-0 z-50 ml-4 mt-4">
        <NuxtLink to="/">
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
        class="relative bg-cover bg-center z-0 bg-mulegreen"
        :class="[{ 'h-64': recipie.img != '' }, 'h-36']"
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
        <p class="font-semibold my-2 text-2xl">Poêlée de navets</p>
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
          <span v-for="cat in recipie.categories" :key="cat">{{ cat }}</span>
        </div>
        <div class="mt-3">
          <p class="text-xs text-gray-400">
            avec Chou kale, Epinards, Radis, Navet
          </p>
        </div>

        <!-- component -->
        <div class="w-full flex">
          <div class="custom-number-input h-10 w-1/2 mx-auto mt-4">
            <label
              for="custom-input-number"
              class="w-full text-gray-700 text-sm font-semibold hidden"
              >Number of persons
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
                <span class="text-xs -mt-4">Personnes</span>
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
              Ingredients
            </button>
            <button
              class="w-1/2 px-4 py-2 -mb-px text-black rounded-t"
              :class="{
                'border-b-2 border-darkmulegreen': show == 'recipe',
              }"
              @click="show = 'recipe'"
            >
              Recette
            </button>
          </div>

          <!-- Tab Contents
                        <div id="tab-contents">
                          <div id="first" class="p-4">
                            First tab
                          </div>
                        </div> -->
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
                    (ingredient.quantity / recipie.defaultPersons) * nPersons
                  }}</span>
                  <span>{{ ingredient.unit.abbreviation }}</span>
                </td>
                <td class="w-2/3 flex items-center space-x-1">
                  <IngredientIcon
                    :id="ingredient.id"
                    :title="ingredient.title"
                  /><span class="w-full">{{
                    ingredient.ingredient.title
                  }}</span>
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
                  <div class="flex-1 ml-4 font-medium">{{ step.title }}</div>
                </div>
                <div class="ml-12 text-sm">
                  {{ step.desc }}
                </div>
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
      show: 'ingredients',
      recipie: {
        title: 'Pide avec epinard et tomate',
        time: '02:00',
        image: {
          httpUrl:
            'http:\/\/acp.test\/site\/assets\/files\/1118\/img_20180329_193144.jpg',
        },
        defaultPersons: 4,
        categories: [],
        steps: {
          '1622906750-989-1': {
            title: 'Prepare the dough',
            desc: "M\u00e9langer la farine avec la levure s\u00e8che, le sel et le sucre. Ajoutez l'eau et incorporez-la pour former une belle boule de p\u00e2te souple. Vers la fin, ajoutez l'huile et p\u00e9trissez jusqu'\u00e0 ce que la p\u00e2te ressemble \u00e0 un lobe d'oreille. Laissez la p\u00e2te lever couverte dans un endroit chaud pendant 1,30 h.",
            time: '01:30',
          },
          '1622908586-5762-1': {
            title: 'Fourrage',
            desc: "Pr\u00e9parez la farce en coupant d'abord en petits morceaux la partie blanche de l'oignon de printemps et l'ail. Rincez et s\u00e9chez les \u00e9pinards.\n\nFaites chauffer un peu d'huile dans une po\u00eale et ajoutez l'oignon\u00a0 et l'ail et faites-les frire pendant quelques minutes. Ajouter les \u00e9pinards et poursuivre la cuisson jusqu'\u00e0 ce qu'ils soient fl\u00e9tris. Retirer du feu et ajouter le sel et le poivre.\n\n<p>Hacher grossi\u00e8rement la tomate (par exemple, en deux ou en quatre) et la m\u00e9langer avec les \u00e9pinards, les oignons, le gruy\u00e8re r\u00e2p\u00e9, la feta \u00e9miett\u00e9e et le paprika.<\/p>",
            time: null,
          },
          '1622908946-2577-1': {
            title: 'Pate',
            desc: 'Sur une surface farin\u00e9e, p\u00e9trissez la p\u00e2te pendant un court moment et faites 4 morceaux. Formez des boules de p\u00e2te et laissez-les lever \u00e0 nouveau pendant 10 minutes.',
            time: '00:10',
          },
          '1622909214-4758-1': {
            title: 'Montage',
            desc: "Pr\u00e9chauffez le four \u00e0 220 C\n\nUtilisez un rouleau \u00e0 p\u00e2tisserie pour aplatir les boules de p\u00e2te \u00e0 environ 30 x 15 cm. \u00c9talez la garniture en laissant un espace d'environ 1,5 \u00e0 2 cm sur les bords. Repliez la p\u00e2te non recouverte, passez-la \u00e0 l'\u0153uf et ajoutez \u00e9ventuellement quelques graines de s\u00e9same.\n\n<p>Faites cuire sur une plaque \u00e0 p\u00e2tisserie pendant environ 12 minutes dans la partie inf\u00e9rieure du four.<\/p>",
            time: '00:12',
          },
        },
        ingredients: {
          '1622906254-0702-1': {
            title: 'Pate',
            ingredientList: {
              '1622906261-8615-1': {
                ingredient: { id: 1128, title: 'Flour' },
                quantity: '500',
                unit: { abbreviation: 'g' },
              },
              '1622906315-3831-1': {
                ingredient: { id: 1129, title: 'Water' },
                quantity: '300',
                unit: { abbreviation: null },
              },
              '1622906336-4178-1': {
                ingredient: { id: 1131, title: 'Sugar' },
                quantity: '1',
                unit: { abbreviation: 'cuil. \u00e0 caf\u00e9' },
              },
              '1622906356-3846-1': {
                ingredient: { id: 1093, title: 'salt' },
                quantity: '1.5',
                unit: { abbreviation: 'cuil. \u00e0 caf\u00e9' },
              },
              '1622906374-4752-1': {
                ingredient: { id: 1132, title: 'Olive oil' },
                quantity: '4',
                unit: { abbreviation: null },
              },
            },
          },
          '1622906428-9302-1': {
            title: 'Fourrage',
            ingredientList: {
              '1622906578-3696-1': {
                ingredient: { id: 1141, title: 'Feta' },
                quantity: '1',
                unit: { abbreviation: null },
              },
              '1622906591-1627-1': {
                ingredient: { id: 1143, title: 'Gruyere' },
                quantity: '50',
                unit: { abbreviation: 'g' },
              },
              '1622906610-3059-1': {
                ingredient: { id: 1144, title: 'Spring onion' },
                quantity: '1',
                unit: { abbreviation: 'pce' },
              },
              '1622906655-7891-1': {
                ingredient: { id: 1145, title: 'Tomato' },
                quantity: '4',
                unit: { abbreviation: 'pce' },
              },
              '1622906699-9445-1': {
                ingredient: { id: 1055, title: 'Sel &amp; Poivre' },
                quantity: null,
                unit: [],
              },
              '1622906708-0237-1': {
                ingredient: { id: 1054, title: 'Paprika moulu' },
                quantity: '0.25',
                unit: { abbreviation: 'cuil. \u00e0 caf\u00e9' },
              },
              '1622908769-0753-1': {
                ingredient: { id: 1084, title: 'garlic' },
                quantity: '1',
                unit: { abbreviation: 'clove' },
              },
              '1622909421-7338-1': {
                ingredient: { id: 1155, title: 'Sesame' },
                quantity: '1',
                unit: { abbreviation: null },
              },
              '1622909443-7835-1': {
                ingredient: { id: 1156, title: 'Egg' },
                quantity: '1',
                unit: { abbreviation: 'pce' },
              },
            },
          },
        },
      },
      nPersons: null,
    }
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
