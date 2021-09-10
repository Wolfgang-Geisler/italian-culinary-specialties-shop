export const state = () => ({
  items: [],
})

export const mutations = {
  add(state, { product, amount }) {
    // if product is already in the cart, an index is returned
    const index = state.items.map((item) => item.product.id).indexOf(product.id)

    if (index >= 0) {
      // item is already in the cart, add the amount to the current amount
      state.items[index].amount += amount
    } else {
      // item is not in the cart, add it
      state.items.push({ product, amount })
    }
  },
  remove(state, productId) {
    // filter out the product id and update the array
    state.items = state.items.filter((i) => !(i.product.id === productId))
  },
  increaseAmount(state, index) {
    state.items[index].amount++
  },
  decreaseAmount(state, index) {
    if (state.items[index].amount > 1) {
      state.items[index].amount--
    }
  },
  clear(state) {
    state.items = []
  },
}
