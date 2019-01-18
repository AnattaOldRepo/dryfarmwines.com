import { formatOrders } from "../assets/js/formatOrders";

export default {
  state: {},
  getters: {},
  mutations: {
    setOrders(state, value) {
      state = Object.assign(state, { ...formatOrders(value) });
    }
  }
};
