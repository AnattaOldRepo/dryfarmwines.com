import { formatProducts } from "../assets/js/formatProducts";

export default {
  state: {
    products: {}
  },
  getters: {
    products: state => {
      return state.products;
    },
    productById: state => id => {
      return state.products[id];
    },
    shopifyProduct: state => id => {
      return state.products[id].shopify_product;
    },
    shopifyVariant: (state, getters) => (productId, variantId) => {
      return getters.shopifyProduct(productId).variants[variantId];
    },
    shopifyVariantImage: (state, getters) => (productId, variantId) => {
      const product = getters.shopifyProduct(productId);
      const variantImageId = getters.shopifyVariant(productId, variantId)
        .image_id;
      return product.images[variantImageId];
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = { ...formatProducts(payload) };
    }
  }
};
