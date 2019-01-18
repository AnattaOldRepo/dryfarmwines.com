import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import { formatDeliveries } from '../assets/js/formatDeliveries'
import { isEmptyObject } from '../assets/js/isEmptyObject'
import { loadRechargeData } from '../assets/js/loadRechargeData'

export default {
  state: {
    activeDeliveryDate: false,
    deliveryInterval: 30,
    deliveryUnit: 'day',
    deliveries: {}
  },
  getters: {
    activeDeliveryDate: state => {
      return state.activeDeliveryDate
    },
    activeDelivery: state => {
      if (!isEmptyObject(state.deliveries)) {
        return state.deliveries[state.activeDeliveryDate]
      }
    },
    deliverySettings: state => {
      return {
        deliveryInterval: state.deliveryInterval,
        deliveryUnit: state.deliveryUnit
      }
    },
    firstActiveDeliveryItem: (state, getters) => {
      const deliveryList = getters.activeDelivery
      if (deliveryList) {
        return deliveryList.delivery[Object.keys(deliveryList.delivery)[0]]
      }
    },
    activeDeliveryChargeId: (state, getters) => {
      const firstItem = getters.firstActiveDeliveryItem
      if (firstItem) {
        return firstItem.charge_id
      }
    },
    activeDeliverySubscriptionIds: (state, getters) => {
      const activeDelivery = getters.activeDelivery
      if (activeDelivery) {
        return [...Object.keys(activeDelivery.delivery)]
      }
    },
    activeDeliveryNextCharge: (state, getters) => {
      const firstItem = getters.firstActiveDeliveryItem
      if (firstItem) {
        return firstItem.subscription.next_charge_scheduled_at.split('T')[0]
      }
    }
  },
  mutations: {
    setDeliveries(state, value) {
      state.deliveries = { ...formatDeliveries(value) }
    },
    setActiveDeliveryDate(state, value) {
      state.activeDeliveryDate = value
    },
    setDeliveryInterval(state, value) {
      state.deliveryInterval = value
    }
  },
  actions: {
    skipDelivery({ commit, state, rootState }) {
      commit('ui/setAppUpdating', null, { root: true })
      const customerHash = rootState.customer.profile.hash
      const date = moment(state.activeDeliveryDate)
        .add(state.deliveryInterval, 'days')
        .format('YYYY-MM-DD')
      const interval = 3000
      let promise = Promise.resolve()
      let length = Object.keys(rootState.subscriptions.subscriptions).length
      Object.keys(rootState.subscriptions.subscriptions).forEach(
        subscriptionId => {
          promise = promise.then(function() {
            axios
              .post(
                `https://shopifysubscriptions.com/customers/${customerHash}/subscriptions/${subscriptionId}/set_next_charge_date/${date}`,
                qs.stringify({
                  action: 'customer moved date',
                  first_charge_date: date
                })
              )
              .then(async function() {
                length = length - 1
                if (length === 0) {
                  await loadRechargeData(rootState.customer.profile.hash)
                  commit('ui/clearAppUpdating', null, { root: true })
                }
              })
            return new Promise(resolve => {
              setTimeout(resolve, interval)
            })
          })
        }
      )
    }
  }
}
