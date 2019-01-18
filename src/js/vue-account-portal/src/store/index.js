import Vuex from "vuex";
import Vue from "vue";

import addresses from "./addresses";
import customer from "./customer";
import deliveries from "./deliveries";
import orders from "./orders";
import products from "./products";
import subscriptions from "./subscriptions";
import ui from "./ui";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    addresses: {
      namespaced: true,
      ...addresses
    },
    customer: {
      namespaced: true,
      ...customer
    },
    deliveries: {
      namespaced: true,
      ...deliveries
    },
    orders: {
      namespaced: true,
      ...orders
    },
    subscriptions: {
      namespaced: true,
      ...subscriptions
    },
    products: {
      namespaced: true,
      ...products
    },
    ui: {
      namespaced: true,
      ...ui
    }
  }
});
