const state = {
  showAddProductModal: false,
  addProductModalProduct: null, // Should be the shopify_product inside of the main product object
  mode: 'add'
}

const mutations = {
  openAddProductModal: (state, { product, mode = 'add' }) => {
    if (Object.keys(product).length) {
      state.addProductModalProduct = product
      state.showAddProductModal = true
      state.mode = mode
    }
  },

  closeAddProductModal: state => {
    state.showAddProductModal = false
    state.addProductModalProduct = null
    state.mode = 'add'
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
