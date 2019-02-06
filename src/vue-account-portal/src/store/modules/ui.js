const state = {
  showAddProductModal: false,
  addProductModalProduct: null // Should be the shopify_product inside of the main product object
}

const mutations = {
  openAddProductModal: (state, value) => {
    if (Object.keys(value.product).length) {
      state.addProductModalProduct = value.product
      state.showAddProductModal = true
    }
  },

  closeAddProductModal: state => {
    state.showAddProductModal = false
    state.addProductModalProduct = null
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
