import qs from "qs";
import axios from "axios";
import { isEmptyObject } from "../assets/js/isEmptyObject";
import { formatAddresses } from "../assets/js/formatAddresses";
import { rechargeUrl, previewThemeQuery } from "../config";

export default {
  state: {
    activeAddressId: false,
    addresses: {}
  },
  getters: {
    activeAddress: state => {
      if (!isEmptyObject(state.addresses)) {
        return state.addresses[state.activeAddressId];
      }
    }
  },
  mutations: {
    setAddresses(state, value) {
      state.addresses = { ...formatAddresses(value) };
    },
    setActiveAddressId(state, value) {
      state.activeAddressId = value;
    },
    setAddress(state, { addressId, payload }) {
      state.addresses = {
        ...state.addresses,
        [addressId]: {
          ...state.addresses[addressId],
          ...payload
        }
      };
    }
  },
  actions: {
    async updateAddress({ state, commit, rootState }, payload) {
      commit("ui/toggleAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const updateAddressUrl = `${rechargeUrl}${customerHash}/addresses/${
        state.activeAddressId
      }/edit${previewThemeQuery}`;
      await axios
        .post(updateAddressUrl, qs.stringify(payload))
        .then(response => {
          commit("setAddress", { addressId: state.activeAddressId, payload });
        })
        .catch(error => {
          return error;
        });
      commit("ui/toggleAppUpdating", null, { root: true });
    }
  }
};
