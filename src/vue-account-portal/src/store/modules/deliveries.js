import API from '../api'
import qs from 'qs'
import { rechargeURL } from '@/config'

const state = {
  deliverySchedule: [],
  activeDeliverySchedule: {},
  activeDeliveryScheduleIndex: 0,
  activeFirstDeliverySubscription: null,
  activeDeliveryFrequency: null,
  activeDeliveryIntervalUnit: null
}

const mutations = {
  setActiveDeliverySchedule: (state, value) => {
    state.activeDeliverySchedule = value
  },

  setActiveDeliveryScheduleIndex: (state, value) => {
    state.activeDeliveryScheduleIndex = value
  },

  setActiveFirstDeliverySubscription: (state, value) => {
    state.activeFirstDeliverySubscription = value
  },

  setActiveDeliveryFrequency: (state, value) => {
    state.activeDeliveryFrequency = value
  },

  setActiveDeliveryIntervalUnit: (state, value) => {
    state.activeDeliveryIntervalUnit = value
  },

  setDeliverySchedule: (state, value) => {
    state.deliverySchedule = value
  }
}

const actions = {
  selectDeliveryFrequencyAction: ({ commit, dispatch, rootState }, payload) => {
    const { customerHash } = rootState

    let {
      subscriptionIds,
      intervalFrequency,
      activeDeliveryIntervalUnit
    } = payload

    const interval = 3000
    let promise = Promise.resolve()
    let updatesRequired = 0
    let completedUpdates = 0

    commit('setUpdateOverlay', true)
    commit('setFrequencySaved', false)
    commit('setFrequencyUpdating', true)

    subscriptionIds.forEach(function(subscriptionId) {
      updatesRequired += 1

      let UPDATE_API = `${rechargeURL}${customerHash}/subscriptions/${subscriptionId}/edit`

      promise = promise.then(function() {
        API.post(
          UPDATE_API,
          qs.stringify({
            order_interval_frequency: intervalFrequency,
            order_interval_unit: activeDeliveryIntervalUnit
          })
        )
          .then(function() {
            completedUpdates += 1
            updateView()
          })
          .catch(function(error) {
            console.log(error)
          })

        return new Promise(function(resolve) {
          setTimeout(resolve, interval)
        })
      })
    })

    function updateView() {
      if (updatesRequired === completedUpdates) {
        let callback = {
          name: 'select-delivery-frequency',
          intervalFrequency: intervalFrequency
        }

        dispatch('loadInitialData', callback)
      }
    }
  }
}

const getters = {
  uniqueDeliveries: state => {
    console.log(state.deliverySchedule)
    const { deliverySchedule } = state

    let finalUniqueDeliveries = [] // return

    let subIdGroupsByDeliveryIndex = {}

    // corresponds to finalUniqueDeliverys, but shows corresponding subIds
    let compareSubIdsArrArr = []

    // return true if arrays don't share the same values
    function _arraysSameValues(_arr1, _arr2) {
      const arr1 = _arr1.concat().sort()
      const arr2 = _arr2.concat().sort()

      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    }

    // loop each delivery schedule
    deliverySchedule.forEach((scheduleItem, index) => {
      // setup internal array, to hold sub ids
      subIdGroupsByDeliveryIndex[index] = []

      // set each internal subscription ID into interal array of sub ids
      // inside object keyed by delivery index, so we can figure out
      // where there's overlap in deliveries
      scheduleItem.delivery.forEach(item => {
        if (!item.is_skipped) {
          subIdGroupsByDeliveryIndex[index].push(item.subscription.id)
        }
      })
    })

    // key === index in deliverySchedule array
    Object.keys(subIdGroupsByDeliveryIndex).forEach(key => {
      let currentSubIdArr = subIdGroupsByDeliveryIndex[key]

      // add first one always
      if (!finalUniqueDeliveries.length && currentSubIdArr.length) {
        // Make sure delivery has non-skipped items
        // add actual deliverySchedule item -- deliveryShedule[key]
        finalUniqueDeliveries.push(deliverySchedule[key])

        // add arr to compare arr, to use for future checks
        compareSubIdsArrArr.push(currentSubIdArr)
      }

      // if one unique delivery already set
      else {
        // compare to existing arr of ids
        // in compareSubIdsArrArr to determine uniqueness
        // console.log('compareSubIdsArrArr', compareSubIdsArrArr)
        let alreadySubscriptionSet = false

        compareSubIdsArrArr.forEach(compareArr => {
          // console.log('compareSubIdsArrArr => compareArr', compareArr)
          // console.log('compareSubIdsArrArr.forEach -> currentSubIdArr', currentSubIdArr)

          // if it's a new combination of items, add delivery to unique list
          if (_arraysSameValues(compareArr, currentSubIdArr)) {
            alreadySubscriptionSet = true
          }
        })

        if (!alreadySubscriptionSet) {
          // add actual deliverySchedule item -- deliveryShedule[key]
          finalUniqueDeliveries.push(deliverySchedule[key])

          // add arr to compare arr, to use for future checks
          compareSubIdsArrArr.push(currentSubIdArr)
        }
      }
    })

    return finalUniqueDeliveries
  },

  activeDeliveryScheduleGetter: (state, getters) => {
    const { uniqueDeliveries } = getters
    const { activeDeliveryScheduleIndex } = state

    return uniqueDeliveries[activeDeliveryScheduleIndex]
  },

  activeDeliveryChargeScheduledAt: (state, getters) => {
    if (
      getters.uniqueDeliveries &&
      state.activeDeliveryScheduleIndex !== null &&
      getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
    ) {
      return getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
        .delivery[0].subscription.next_charge_scheduled_at
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
