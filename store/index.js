export const state = () => ({
  panier: null,
  panierModification: null,
  selectedIngredients: [],
  basketIds: [],
})

export const getters = {}

// export function recursivelyFindProp(o, keyToBeFound) {
//   const that = this
//   Object.keys(o).forEach(function (key) {
//     if (typeof o[key] === 'object') {
//       that.recursivelyFindProp(o[key], keyToBeFound)
//     } else {
//       /* eslint-disable no-lonely-if */
//       if (key === keyToBeFound) {
//         state.commit('addSelectedIngredients', o[key])
//       }
//     }
//   })
// }

export const actions = {
  async getPanier(state) {
    const res = await this.$axios.get('http://acp.test/paniers/')
    console.log(state.state.panierModification < res.data.modified)
    console.log(res.data.modified)
    if (state.state.panierModification < res.data.modified) {
      console.log('updated')
      state.commit('addPanier', res.data)
      state.commit('setPanierDate', res.data.modified)
      const ingredients = res.data.ingredientList
      const ids = Object.keys(ingredients).map(
        (item) => ingredients[item].ingredient.id
      )
      state.commit('setSelectedIngredients', ids)
    }
  },
  //   async getPanier() {
  //     const panier = await fetch('http://acp.test/paniers/').then((res) =>
  //     res.json()
  //   )
  //     commit('addPanier', panier)
  //     return panier
  //   },
}

export const mutations = {
  addPanier(state, panier) {
    state.panier = panier
  },
  setPanierDate(state, moddate) {
    console.log(moddate)
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
