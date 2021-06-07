export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'acp-recipie',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-awesome-countdown.js', {
    src: '~/plugins/vuex-persist',
    mode: 'client'
  },
    { ssr: false, src: '~plugins/getPanier.js' }
],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'nuxt-use-sound',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-i18n',
  ],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          panierthisweek: 'This weeks basket',
          suggestions: 'Suggestions',
          category: {
            'all': 'All',
            '1033': 'Vegetarian',
            '1034': 'Vegan',
            '1035': 'Indian',
            '1157': 'Asian',
            '1058': 'Soup',
            '1158': 'Quick',
            '1077': 'Exotic',
            '1078': 'African'
          },
          with: 'with',
          contribute: 'Add a recipe',
          concept: 'The concept of ACP',
          myfavorites: 'My Favorites',
          subscribe: 'Subscribe to paniers',
          instructions:"Instructions",
          ingredients:"Ingredients", 
          persons:"Persons",
          numberofpersons:"Number of persons",
          createdby:"Created by",
          imageby:"Image by",
          licensedunder:"licensed under"
        },
        fr: {
          panierthisweek: 'Contenu du panier de cette semaine',
          suggestions: 'Propositions',
          category: {
            'all': 'Toutes',
            '1033': 'Vegetarian',
            '1034': 'Vegan',
            '1035': 'Indien,',
            '1157': 'Asiatique ',
            '1058': 'Soupe',
            '1158': 'Rapide',
            '1077': 'Exotique',
            '1078': 'African'
          },
          with: 'avec',
          contribute: 'Contribuer une recette',
          concept: 'Le concepte ACP',
          myfavorites: 'Mes favoris',
          subscribe: "S'abonner aux paniers",
          instructions:"Instructions",
          ingredients:"Ingredients",
          persons:"Personnes", 
          numberofpersons:"Nombre des personnes",
          createdby:"cree par",
          imageby:"Image de",
          licensedunder:"license sous"
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  //vue sound config
  sound: {
    back: {
      src: '/250629__kwahmah-02__alarm1.mp3',
      options: {
        volume: 1,
      },
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
