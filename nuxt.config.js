export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'La Mule recettes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Recipes for La Mule - cooperative marachaire a Prilly, Vaud' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },
  css: [],
  plugins: ['~/plugins/vue-awesome-countdown.js', {
    src: '~/plugins/vuex-persist',
    mode: 'client'
  }
],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-use-sound',
  ],
  modules: [
    '@nuxtjs/axios',
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
            '1078': 'African',
            '1259':"Apero",
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
          licensedunder:"licensed under",
          othercategories:"Other categories",
        },
        fr: {
          panierthisweek: 'Contenu du panier de cette semaine',
          suggestions: 'Propositions',
          category: {
            'all': 'Toutes',
            '1033': 'Vegetarian',
            '1034': 'Vegan',
            '1035': 'Indien',
            '1157': 'Asiatique ',
            '1058': 'Soupe',
            '1158': 'Rapide',
            '1077': 'Exotique',
            '1078': 'African',
            '1259':"Apero",
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
          licensedunder:"license sous",
          othercategories:"Autres categories",
        },
      },
    },
  },
  axios: {},
  sound: {
    back: {
      src: '/250629__kwahmah-02__alarm1.mp3',
      options: {
        volume: 1,
      },
    },
  },
  pwa: {
    manifest: {
      lang: 'fr',
      name: 'La Mule Recettes',
      short_name: 'La Mule',
      description:"Recettes pour la Mule"
    },
    icon:{
      source:'/static/icon.png'
    }
  },
  build: {},
}
