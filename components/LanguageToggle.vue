<template>
  <div>
    <div
      class="
        bg-gray-200
        text-base text-gray-500
        leading-none
        border-2 border-gray-200
        rounded-full
        inline-flex
      "
    >
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale"
        :to="switchLocalePath(locale)"
        class="
          inline-flex
          items-center
          transition-colors
          duration-300
          ease-in
          focus:outline-none
          hover:text-green-400
          focus:text-green-400
          rounded-l-full
          px-4
          py-2
        "
        :class="{ active: lang === locale }"
        >{{ locale }}
      </nuxt-link>
      <!-- <button
        class="
          inline-flex
          items-center
          transition-colors
          duration-300
          ease-in
          focus:outline-none
          hover:text-green-400
          focus:text-green-400
          rounded-l-full
          px-4
          py-2
        "
        
        id="grid"
        @click="switchLang('fr')"
      >
        <span>fr</span>
      </button>
      <button
        class="
          inline-flex
          items-center
          transition-colors
          duration-300
          ease-in
          focus:outline-none
          hover:text-green-400
          focus:text-green-400
          rounded-r-full
          px-4
          py-2
        "
        :class="{ active: lang === 'en' }"
        id="list"
        @click="switchLang('en')"
      >
        <span>en</span>
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // lang: 'fr',
    }
  },
  methods: {
    switchLang(lang) {
      this.lang = lang
    },
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>

<style>
.active {
  @apply bg-white text-green-400 rounded-full;
}
</style>
