export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  cartAmount(state) {
    if (state.cart.items?.length) {
      let amount = 0

      state.cart.items.forEach((item) => {
        amount += item.amount
      })

      return amount
    }
    return 0
  },

  cart(state) {
    return state.cart
  },
}
