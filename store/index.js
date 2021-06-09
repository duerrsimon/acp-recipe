export const state = () => ({
  panier: null,
  panierModification: null,
  selectedIngredients: [],
  basketIds: [],
  recipes: null,
})

export const getters = {}

export const actions = {
  async getPanier(state, i18n) {
    const res = await this.$axios.get(
      'http://acp.test/paniers/' + this.$i18n.locale //
    )
    if (state.state.panierModification < res.data.modified) {
      console.log('updated')
      state.commit('addPanier', res.data)
      state.commit('setPanierDate', res.data.modified)
      const ingredients = res.data.ingredientList
      const ids = Object.keys(ingredients).map(
        (item) => ingredients[item].ingredient.id
      )
      state.commit('setSelectedIngredients', ids)
      state.dispatch('getRecipes')
    }
  },
  async getRecipes(state) {
    console.log('getRecipes')
    const res = await this.$axios.get(
      'http://acp.test/recipe-search/' + this.$i18n.locale
    )
    state.commit('setRecipes', res.data)
  },
  async updateRecipes(state) {
    console.log('updateRecipes')
    const Data = new FormData()
    Data.set('id', state.state.selectedIngredients)
    const res = await this.$axios.post(
      'http://acp.test/recipe-search/' + this.$i18n.locale,
      Data
    )
    state.commit('setRecipes', res.data)
  },
}

export const mutations = {
  setRecipes(state, recipes) {
    state.recipes = recipes
  },
  addPanier(state, panier) {
    state.panier = panier
  },
  setPanierDate(state, moddate) {
    state.panierModification = moddate
  },
  setSelectedIngredients(state, ids) {
    state.selectedIngredients = ids
    state.basketIds = ids
  },
  resetSelectedIngredients(state) {
    state.selectedIngredients = state.basketId
  },
  addSelectedIngredients(state, ingredient) {
    const index = state.selectedIngredients.indexOf(ingredient)
    if (index === -1) {
      state.selectedIngredients.push(ingredient)
    }
  },
  removeSelectedIngredients(state, ingredient) {
    const index = state.selectedIngredients.indexOf(ingredient)
    state.selectedIngredients.splice(index, 1)
  },
}
