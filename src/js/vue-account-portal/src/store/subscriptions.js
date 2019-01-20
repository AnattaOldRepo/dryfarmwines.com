import qs from "qs";
import axios from "axios";
import moment from "moment";
import { formatSubscriptions } from '../assets/js/formatSubscriptions'
import { isEmptyObject } from '../assets/js/isEmptyObject'
import { loadRechargeData } from '../assets/js/loadRechargeData'
import { rechargeUrl, previewThemeQuery } from "../config";

export default {
  state: {
    activeSubscriptionId: false,
    subscriptions: {}
  },
  getters: {
    subscriptions: state => {
      return state.subscriptions;
    },
    activeSubscription: state => {
      if (!isEmptyObject(state.subscriptions)) {
        return state.subscriptions[state.activeSubscriptionId];
      }
    }
  },
  mutations: {
    setSubscriptions(state, value) {
      state.subscriptions = { ...formatSubscriptions(value) };
    },
    setActiveSubscriptionId(state, value) {
      state.activeSubscriptionId = value;
    }
  },
  actions: {
    addSubscription({ commit, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      axios
        .post(
          `${rechargeUrl}${customerHash}/subscriptions/new${previewThemeQuery}`,
          qs.stringify({
            address_id: rootState.addresses.activeAddressId,
            next_charge_date: moment(
              rootState.deliveries.activeDeliveryDate
            ).format("YYYY-MM-DD"),
            order_interval_frequency: rootState.deliveries.deliveryInterval,
            order_interval_unit: rootState.deliveries.deliveryUnit,
            quantity: 1,
            shopify_variant_id: payload.id,
            is_subscription_item: payload.is_subscription_item
          })
        )
        .then(async function() {
          await loadRechargeData(customerHash);
          commit("ui/clearAppUpdating", null, { root: true });
        });
    },
    updateSubscription({ state, commit, dispatch, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const { data, subscriptionId } = payload;
      if (data.quantity > 0) {
        const endpoint = `${rechargeUrl}${customerHash}/subscriptions/${subscriptionId}/edit${previewThemeQuery}`;
        axios.post(endpoint, qs.stringify(data)).then(async function() {
          await loadRechargeData(customerHash);
          commit("ui/clearAppUpdating", null, { root: true });
        });
      } else {
        dispatch("cancelSubscription", { subscriptionId });
      }
    },
    updateChargeDate({ commit }, payload) {
      const { customerHash, date, subscriptionId } = payload;
      return axios.post(
        `https://shopifysubscriptions.com/customers/${customerHash}/subscriptions/${subscriptionId}/set_next_charge_date/${date}`,
        qs.stringify({
          action: "customer moved date",
          first_charge_date: date
        })
      );
    },
    updateAllChargeDates({ commit, dispatch, state, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const date = moment(payload).format("YYYY-MM-DD");
      const interval = 3000;
      let promise = Promise.resolve();
      let length = Object.keys(state.subscriptions).length;
      Object.keys(state.subscriptions).forEach(subscriptionId => {
        promise = promise.then(function() {
          dispatch("updateChargeDate", {
            customerHash,
            date,
            subscriptionId
          }).then(async function() {
            length = length - 1;
            if (length === 0) {
              await loadRechargeData(customerHash);
              commit("ui/clearAppUpdating", null, { root: true });
            }
          });
          return new Promise(resolve => {
            setTimeout(resolve, interval);
          });
        });
      });
    },
    updateInterval({ rootState }, payload) {
      const { customerHash, interval, subscriptionId } = payload;
      return axios.post(
        `${rechargeUrl}${customerHash}/subscriptions/${subscriptionId}/edit${previewThemeQuery}`,
        qs.stringify({
          order_interval_frequency: interval,
          order_interval_unit: rootState.deliveries.deliveryUnit
        })
      );
    },
    updateAllIntervals({ commit, state, dispatch, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const interval = 3000;
      const date = moment(rootState.deliveries.activeDeliveryDate).format(
        "YYYY-MM-DD"
      );
      let promise = Promise.resolve();
      let length = Object.keys(state.subscriptions).length;
      Object.keys(state.subscriptions).forEach(subscriptionId => {
        promise = promise.then(function() {
          dispatch("updateInterval", {
            customerHash,
            interval: payload,
            subscriptionId
          }).then(async function() {
            length = length - 1;
            dispatch("updateChargeDate", {
              customerHash,
              date,
              subscriptionId
            });
            if (length === 0) {
              await loadRechargeData(customerHash);
              commit("ui/clearAppUpdating", null, { root: true });
            }
          });
          return new Promise(resolve => {
            setTimeout(resolve, interval);
          });
        });
      });
    },
    cancelSubscription({ commit, state, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const { subscriptionId, reason, comments } = payload;
      const reasons_to_cancel = reason ? reason : "No Reason";
      const cancellation_reason_comments = comments ? comments : "";
      axios
        .post(
          `https://www.dryfarmwines.com/tools/recurring/customers/${customerHash}/subscriptions/cancel${previewThemeQuery}`,
          qs.stringify({
            cancellation_reason_comments,
            reasons_to_cancel,
            purchase_item_id: subscriptionId
          })
        )
        .then(async function() {
          commit("ui/setDrawer", null, { root: true });
          await loadRechargeData(customerHash);
          commit("ui/clearAppUpdating", null, { root: true });
        });
    },
    cancelAllSubscriptions({ commit, dispatch, state, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const { reason, comments } = payload;
      let promise = Promise.resolve();
      let length = Object.keys(state.subscriptions).length;
      Object.keys(state.subscriptions).forEach(subscriptionId => {
        promise = promise.then(function() {
          dispatch("cancelSubscription", {
            subscriptionId,
            reason,
            comments
          }).then(async function() {
            length = length - 1;
            if (length === 0) {
              await loadRechargeData(customerHash);
              commit("ui/clearAppUpdating", null, { root: true });
            }
          });
          return new Promise(resolve => {
            setTimeout(resolve, interval);
          });
        });
      });
    },
    pauseAllSubscriptions({ commit, state, rootState }) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      const promises = [];
      Object.keys(state.subscriptions).forEach(subscriptionId => {
        promises.push(
          axios.post(
            `https://dryfarmwines.shopifysubscriptions.com/customers/${customerHash}/subscriptions/cancel`,
            qs.stringify({
              cancellation_reason_comments: "",
              reasons_to_cancel: "Select a reason",
              purchase_item_id: subscriptionId
            })
          )
        );
      });
      axios.all(promises).then(async function() {
        await loadRechargeData(customerHash);
        commit("ui/clearAppUpdating", null, { root: true });
      });
    },
    async pauseSubscription({ commit, state, rootState }, payload) {
      commit("ui/setAppUpdating", null, { root: true });
      const customerHash = rootState.customer.profile.hash;
      axios
        .post(
          `${rechargeUrl}${customerHash}/subscriptions/${subscriptionId}/cancel`,
          qs.stringify({
            cancellation_reason_comments: "test",
            puchase_item_id: 25049697,
            reasons_to_cancel
          })
        )
        .then(async function() {
          await loadRechargeData(customerHash);
          commit("ui/clearAppUpdating", null, { root: true });
        });
    }
  }
};
