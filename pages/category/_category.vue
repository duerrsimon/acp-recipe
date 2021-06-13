<template>
  <div>
    <Menu />
    <div class="relative z-0">
      <!-- <div class="absolute top-0 left-0 z-50 ml-4 mt-4">
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
    </div> -->
      <!-- <div class="relative bg-cover bg-center h-36 z-0 bg-mulegreen">
    </div> -->
      <div class="relative rounded-3xl min-h-screen pt-4 px-6 bg-white z-10">
        <div class="flex font-semibold my-6 space-x-2 text-2xl">
          <img
            :src="'/icons/' + categories[slug].icon + '.png'"
            alt=""
            class="h-8 w-8"
          />
          <span>{{ $t('category.' + categories[slug].key) }}</span>
        </div>

        <ListPreview
          v-for="(recipe, key) in recipes"
          :key="key"
          :recipe="recipe"
          :slug="key"
          class="w-full"
        />
        <NoRecipes v-if="recipes.length == 0" />
        <div class="mt-8 mb-24">
          <h3 class="font-medium text-xl">{{ $t('othercategories') }}</h3>
          <div class="relative mb-12">
            <NuxtLink
              v-for="(value, slug) in categories"
              :key="slug"
              :to="localePath('/category/' + slug)"
              class="
                mt-4
                font-lg
                block
                font-medium
                text-gray-900
                hover:text-gray-700
                p-2
                border border-gray-300
                rounded
                flex
                justify-center
              "
            >
              <div class="flex space-x-1 mx-auto">
                <img
                  :src="'/icons/' + value.icon + '.png'"
                  alt=""
                  class="h-6 w-6"
                />
                <span>{{ $t('category.' + value.key) }}</span>
              </div>
            </NuxtLink>
          </div>
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
  scrollToTop: true,
  async asyncData({ params, i18n }) {
    const slug = params.category // When calling /abc the slug will be "abc"
    const recipes = await fetch(
      'https://recipes.simonduerr.eu/categories/' + slug + '/' + i18n.locale
    ).then((res) => res.json())
    return { slug, recipes }
  },
  data() {
    return {
      categories: {
        vegetarian: { icon: 'icons8-vegetarian-food-100', key: 1033 },
        vegan: { icon: 'icons8-vegan-food-100', key: 1034 },
        indian: { icon: 'icons8-naan-100', key: 1035 },
        asian: { icon: 'icons8-dim-sum-100', key: 1157 },
        soup: { icon: 'icons8-healthy-food-100', key: 1058 },
        quick: { icon: 'icons8-taco-100', key: 1158 },
        apero: { icon: 'icons8-cheese-100', key: 1259 },
      },
    }
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
