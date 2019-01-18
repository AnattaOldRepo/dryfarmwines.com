import qs from "qs";
import axios from "axios";
import { formatCustomer } from "../assets/js/formatCustomer";
import { rechargeUrl, previewThemeQuery } from "../config";

export default {
  state: {
    billingAddress: {},
    paymentMethod: {},
    profile: {}
  },
  getters: {
    hash: state => {
      return state.profile.hash;
    },
    billingAddress: state => {
      return state.billingAddress;
    },
    paymentMethod: state => {
      return state.paymentMethod;
    },
    profile: state => {
      return state.profile;
    },
    fullName: state => {
      return `${state.profile.first_name} ${state.profile.last_name}`;
    }
  },
  mutations: {
    setCustomer(state, payload) {
      const customer = formatCustomer(payload);
      state.billingAddress = customer.billingAddress;
      state.paymentMethod = customer.paymentMethod;
      state.profile = customer.profile;
    },
    setBilling(state, payload) {
      state.billingAddress = payload;
    }
  },
  actions: {
    async updateCustomer({ state, commit }, { payload, mutation }) {
      commit("ui/toggleAppUpdating", null, { root: true });
      const customerHash = state.profile.hash;
      const updateUrl = `${rechargeUrl}${customerHash}/edit${previewThemeQuery}`;
      await axios
        .post(updateUrl, qs.stringify({ billing_first_name: "test" }))
        .then(response => {
          console.log(response);
          commit(mutation, {
            ...payload
          });
        })
        .catch(error => {
          return error;
        });
      commit("ui/toggleAppUpdating", null, { root: true });
    },
    updateBilling({ dispatch }, payload) {
      dispatch("updateCustomer", { payload, mutation: "setBilling" });
    }
  }
};
