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
      <div class="relative bg-cover bg-center h-36 z-0 bg-mulegreen">
        <!-- :class="[{ 'h-64': recipie.image != '' }, 'h-36']" -->
        <!-- :style="'background-image: url(' + recipie.image.httpUrl + ')'" -->
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
        <p class="font-semibold my-2 text-2xl">{{ slug }}</p>
        <div class="flex flex-col space-y-2">
          <ListPreview
            v-for="(recipe, key) in recipes"
            :recipe="recipe"
            :key="key"
            :slug="key"
          />
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
    const slug = params.category // When calling /abc the slug will be "abc"
    const recipes = await fetch(
      'http://acp.test/categories/' + slug + '/'
    ).then((res) => res.json())
    return { slug, recipes }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {},
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
