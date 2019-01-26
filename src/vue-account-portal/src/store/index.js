import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://www.dryfarmwines.com/tools/recurring/customer_portal/',
    customerHash: '',
    customer: {},
    addresses: [],
    orders: [],
    subscriptions: [],
    products: [],
    deliverySchedule: [],

    updateOverlay: false,

    modalOpen: false,
    subscriptionCanceled: false,
    canceledSubscriptionTitles: '',
    canceledFrequencyText: '',

    drawerOpen: false,
    drawerContentType: '',

    initialRechargeDataLoading: true,

    cancellationUpdating: false,

    combineSubscriptionsUpdating: false,
    combineSubscriptionsSaved: false,

    shipsOnUpdating: false,
    shipsOnSaved: false,

    frequencyUpdating: false,
    frequencySaved: false,

    addressUpdating: false,
    addressSaved: false,
    addressUpdateErrors: {},

    skipShipmentUpdating: false,
    skipShipmentSaved: false,

    productEditDrawerUpdating: false,
    productEditDrawerSaved: false,

    updatingRemovingProduct: false,
    newProductAddedSaved: false,
    newProductAdded: {},

    activeDeliverySchedule: {},
    activeDeliveryScheduleIndex: null,

    activeFirstDeliverySubscription: null,
    activeDeliveryAddress: null,
    activeDeliveryAddressId: null,
    activeDeliveryScheduleAddress: null,
    activeDeliveryFrequency: null,
    activeDeliveryIntervalUnit: null,

    subscriptionToSwap: null,
    subscriptionToSwapIndex: null
  },

  getters: {
    activeDeliveryScheduleGetter: (state, getters) => {
      const { uniqueDeliveries } = getters
      const { activeDeliveryScheduleIndex } = state

      return uniqueDeliveries[activeDeliveryScheduleIndex]
    },

    productImages: state => {
      let productImagesById = {}

      state.products.forEach(product => {
        productImagesById[product.shopify_product_id] =
          product.shopify_product.image.src
      })

      return productImagesById
    },

    activeDeliveryChargeScheduledAt: (state, getters) => {
      if (
        getters.uniqueDeliveries &&
        state.activeDeliveryScheduleIndex !== null &&
        getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
      ) {
        console.log(
          'state.activeDeliveryScheduleIndex',
          state.activeDeliveryScheduleIndex
        )
        console.log('getters.uniqueDeliveries', getters.uniqueDeliveries)
        console.log(
          'getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]',
          getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
        )

        return getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
          .delivery[0].subscription.next_charge_scheduled_at
      }
    },

    billingAddressGetter: state => {
      return {
        address1: state.customer.billing_address1,
        address2: state.customer.billing_address2,
        city: state.customer.billing_city,
        company: state.customer.billing_company,
        country: state.customer.billing_country,
        first_name: state.customer.billing_first_name,
        last_name: state.customer.billing_last_name,
        phone: state.customer.billing_phone,
        province: state.customer.billing_province,
        zip: state.customer.billing_zip
      }
    },

    activeDeliveryAddressGetter: state => state.activeDeliveryAddress,

    initialRechargeDataLoadingGetter: state => state.initialRechargeDataLoading,

    activeSubscriptions: state => {
      return state.subscriptions.filter(subscription => {
        return subscription.status === 'ACTIVE'
      })
    },

    // return only products that aren't currently set in a subscription
    availableProducts: (state, getters) => {
      const { products } = state
      const { activeSubscriptions } = getters

      let activeShopifyProductIds = []

      activeSubscriptions.forEach(subscription => {
        activeShopifyProductIds.push(subscription.shopify_product_id)
      })

      console.log('activeShopifyProductIds ', activeShopifyProductIds)

      return products.filter(product => {
        return (
          !activeShopifyProductIds.includes(product.shopify_product_id) &&
          product.handle != 'mushroom-matcha-bundle-3-pack' &&
          product.handle != 'mushroom-coffee-with-lions-mane-ground-3-pack'
        )
      })
    },

    uniqueDeliveries: state => {
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
          console.log('item in uniquedelivery loop', item)
          if (!item.is_skipped) {
            subIdGroupsByDeliveryIndex[index].push(item.subscription.id)
          }
        })
      })

      console.log('subIdGroupsByDeliveryIndex', subIdGroupsByDeliveryIndex)

      // key === index in deliverySchedule array
      Object.keys(subIdGroupsByDeliveryIndex).forEach(key => {
        let currentSubIdArr = subIdGroupsByDeliveryIndex[key]

        // add first one always
        if (!finalUniqueDeliveries.length) {
          console.log('first check sub ID arr', currentSubIdArr)

          // Make sure delivery has non-skipped items
          if (currentSubIdArr.length) {
            console.log('force add first', deliverySchedule[key])

            // add actual deliverySchedule item -- deliveryShedule[key]
            finalUniqueDeliveries.push(deliverySchedule[key])

            // add arr to compare arr, to use for future checks
            compareSubIdsArrArr.push(currentSubIdArr)
          }
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
    }
  },

  mutations: {
    setUpdateOverlay(state, value) {
      state.updateOverlay = value
    },

    setCustomerHash(state, value) {
      state.customerHash = value
    },

    setDrawerContentType(state, value) {
      state.drawerContentType = value
    },

    closeDrawer(state) {
      state.drawerOpen = false

      // reset save states
      state.productEditDrawerUpdating = false
      state.productEditDrawerSaved = false
      state.shipsOnUpdating = false
      state.shipsOnSaved = false
      state.frequencyUpdating = false
      state.frequencySaved = false
      state.addressUpdating = false
      state.addressSaved = false
      state.skipShipmentUpdating = false
      state.skipShipmentSaved = false
      state.productEditDrawerUpdating = false
      state.productEditDrawerSaved = false
      state.newProductAddedSaved = false
      state.newProductAdded = false
    },

    openDrawer(state) {
      state.drawerOpen = true
    },

    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen
    },

    setCanceledSubscriptionTitles(state, value) {
      state.canceledSubscriptionTitles = value
    },

    setCanceledFrequencyText(state, value) {
      state.canceledFrequencyText = value
    },

    setSubscriptionCanceled(state, value) {
      state.subscriptionCanceled = value
    },

    closeModal(state) {
      state.modalOpen = false
      state.subscriptionCanceled = false
    },

    openModal(state) {
      state.modalOpen = true
    },

    toggleModal(state) {
      state.modalOpen = !state.modalOpen
    },

    setCancellationUpdating(state, value) {
      state.cancellationUpdating = value
    },

    setCombineSubscriptionsUpdating(state, value) {
      state.combineSubscriptionsUpdating = value
    },

    setCombineSubscriptionsSaved(state, value) {
      state.combineSubscriptionsSaved = value
    },

    setShipsOnUpdating(state, value) {
      state.shipsOnUpdating = value
    },

    setShipsOnSaved(state, value) {
      state.shipsOnSaved = value
    },

    setFrequencyUpdating(state, value) {
      state.frequencyUpdating = value
    },

    setFrequencySaved(state, value) {
      state.frequencySaved = value
    },

    setProductEditDrawerUpdating(state, value) {
      state.productEditDrawerUpdating = value
    },

    setProductEditDrawerSaved(state, value) {
      state.productEditDrawerSaved = value
    },

    setSkipShipmentUpdating(state, value) {
      state.skipShipmentUpdating = value
    },

    setSkipShipmentSaved(state, value) {
      state.skipShipmentSaved = value
    },

    setAddressUpdating(state, value) {
      state.addressUpdating = value
    },

    setAddressSaved(state, value) {
      state.addressSaved = value
    },

    setSubscriptionToSwap(state, payload) {
      const { subscriptionToSwap, indexInDelivery } = payload

      state.subscriptionToSwap = subscriptionToSwap
      state.subscriptionToSwapIndex = indexInDelivery
    },

    removeProduct(state) {
      console.log('update remove product view states')
      state.productEditDrawerUpdating = false
      state.productEditDrawerSaved = true
    },

    addressUpdateErrors(state, errors) {
      state.addressUpdateErrors = errors
    },

    updateBillingAddressView(state, payload) {
      state.customer.billing_address1 = payload.address1
      state.customer.billing_address2 = payload.address2
      state.customer.billing_city = payload.city
      state.customer.billing_company = payload.company
      state.customer.billing_country = payload.country
      state.customer.billing_first_name = payload.first_name
      state.customer.billing_last_name = payload.last_name
      state.customer.billing_phone = payload.phone
      state.customer.billing_province = payload.province
      state.customer.billing_zip = payload.zip

      state.addressSaved = true
      state.addressUpdating = false
    },

    updateAddressView(state) {
      state.addressSaved = true
      state.addressUpdating = false
    },

    updateQuantityView(state, payload) {
      let { indexInDelivery, newQuantity } = payload

      console.log('update quantity view')
      state.activeDeliverySchedule.delivery[
        indexInDelivery
      ].subscription.quantity = newQuantity
      state.productEditDrawerUpdating = false
      state.productEditDrawerSaved = true
    },

    undoAddProductView(state) {
      console.log('remove from view')
      state.newProductAdded = {}
      state.newProductAddedSaved = false
      state.updatingRemovingProduct = false
    },

    setInitialRechargeDataLoading(state, value) {
      state.initialRechargeDataLoading = value
    },

    setNewProductAdded(state, value) {
      state.newProductAdded = value
    },

    setNewProductAddedSaved(state, value) {
      state.newProductAddedSaved = value
    },

    setActiveDeliverySchedule(state, value) {
      state.activeDeliverySchedule = value
    },

    setActiveDeliveryScheduleIndex(state, value) {
      state.activeDeliveryScheduleIndex = value
    },

    setActiveFirstDeliverySubscription(state, value) {
      state.activeFirstDeliverySubscription = value
    },

    setActiveDeliveryAddress(state, value) {
      state.activeDeliveryAddress = value
    },

    setActiveDeliveryAddressId(state, value) {
      state.activeDeliveryAddressId = value
    },

    setActiveDeliveryFrequency(state, value) {
      state.activeDeliveryFrequency = value
    },

    setActiveDeliveryIntervalUnit(state, value) {
      state.activeDeliveryIntervalUnit = value
    },

    setCustomer(state, value) {
      state.customer = value
    },
    setAddresses(state, value) {
      state.addresses = value
    },
    setSubscriptions(state, value) {
      state.subscriptions = value
    },
    setOrders(state, value) {
      state.orders = value
    },
    setProducts(state, value) {
      state.products = value
    },
    setDeliverySchedule(state, value) {
      console.log('setDeliverySchedule')
      console.log(value)

      state.deliverySchedule.splice(0)
      state.deliverySchedule.push(...value)
    }
  },

  actions: {
    combineSubscriptionsAction({ commit, dispatch, state, getters }, payload) {
      const { customerHash } = state
      const promises = []

      const chargeIntervalFrequency =
        getters.uniqueDeliveries[0].delivery[0].subscription
          .charge_interval_frequency
      const chargeIntervalUnit =
        getters.uniqueDeliveries[0].delivery[0].subscription
          .charge_interval_unit
      const addressId =
        getters.uniqueDeliveries[0].delivery[0].subscription.address_id

      let activeSubscriptionIds = []
      let changeShipmentDateActionPayload = {
        subscriptionIds: [],
        newDate: getters.uniqueDeliveries[0].date.split('T')[0], // 2018-12-21 format,
        callbackType: 'combine-subscriptions'
      }

      commit('setUpdateOverlay', true)
      commit('setCombineSubscriptionsUpdating', true)
      commit('setCombineSubscriptionsSaved', false)

      getters.activeSubscriptions.forEach(sub => {
        activeSubscriptionIds.push(sub.id)
      })

      activeSubscriptionIds.forEach(function(id) {
        let UPDATE_API = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${id}/edit`

        promises.push(
          axios
            .post(
              UPDATE_API,
              qs.stringify({
                // purchase_item_id: id,
                charge_interval_frequency: chargeIntervalFrequency,
                charge_interval_unit_type: chargeIntervalUnit,
                order_interval_frequency: chartIntervalFrequency,
                address_id: addressId
              }),
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                  'X-Requested-With': 'XMLHttpRequest',
                  Accept: 'application/json, text/javascript, */*; q=0.01'
                }
              }
            )
            .then(function(response) {
              console.log(response)
            })
            .catch(function(error) {
              console.log(error)
            })
        )
      })

      changeShipmentDateActionPayload.subscriptionIds = activeSubscriptionIds

      Promise.all(promises)
        .then(() => {
          // console.log('finish frequency updates in combineSubscriptionsAction')
          // pass all subscriptions to change shipment date action
          dispatch('changeShipmentDateAction', changeShipmentDateActionPayload)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    /// sele
    selectDeliveryFrequencyAction({ commit, dispatch, state }, payload) {
      const { customerHash } = state

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

        let UPDATE_API = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${subscriptionId}/edit`

        promise = promise.then(function() {
          axios
            .post(
              UPDATE_API,
              qs.stringify({
                order_interval_frequency: intervalFrequency,
                order_interval_unit: activeDeliveryIntervalUnit
              }),
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                  'X-Requested-With': 'XMLHttpRequest',
                  Accept: 'application/json, text/javascript, */*; q=0.01'
                }
              }
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
    },

    changeShipmentDateAction({ commit, dispatch, state }, payload) {
      const { customerHash } = state

      let {
        subscriptionIds,
        newDate, // 2018-12-21 format
        callbackType
      } = payload

      const interval = 3000
      let promise = Promise.resolve()
      let updatesRequired = 0
      let completedUpdates = 0

      commit('setUpdateOverlay', true)

      if (callbackType === 'edit-ships-on') {
        commit('setShipsOnSaved', false)
        commit('setShipsOnUpdating', true)
      }

      subscriptionIds.forEach(function(subscriptionId) {
        updatesRequired += 1

        let postUrl = `https://shopifysubscriptions.com/customers/${customerHash}/subscriptions/${subscriptionId}/set_next_charge_date/${newDate}`

        promise = promise.then(function() {
          axios
            .post(
              postUrl,
              qs.stringify({
                purchase_id: subscriptionId,
                first_charge_date: newDate,
                action: 'customer moved date'
              }),
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                  // 'X-Requested-With': 'XMLHttpRequest',
                  Accept: 'application/json, text/javascript, */*; q=0.01'
                }
              }
            )
            .then(function(response) {
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
          if (callbackType === 'edit-ships-on') {
            dispatch('loadInitialData', 'edit-ships-on')
          }

          if (callbackType === 'combine-subscriptions') {
            dispatch('loadInitialData', 'combine-subscriptions')
          }
        }
      }
    },

    cancelSubscriptionAction({ commit, dispatch, state }, payload) {
      const { customerHash } = state
      const {
        subscriptionIds,
        reasonToCancel,
        subscriptionTitles,
        frequencyText
      } = payload
      let promises = []

      commit('setCancellationUpdating', true)

      subscriptionIds.forEach(function(subscriptionId) {
        const API_CANCEL = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${subscriptionId}/cancel/${reasonToCancel}`

        promises.push(
          axios
            .post(
              API_CANCEL,
              qs.stringify({
                comments: reasonToCancel
              }),
              {
                headers: {
                  'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
                  'X-Requested-With': 'XMLHttpRequest',
                  Accept: 'application/json, text/javascript, */*; q=0.01'
                }
              }
            )
            .then(function(response) {
              console.log('removed from recharge')
              console.log(response)
            })
            .catch(function(error) {
              console.log(error)

              alert('Cancel failed - please refresh the page.')
            })
        )
      })

      // console.log(promises)

      Promise.all(promises)
        .then(() => {
          // console.log('all cancelations finished')
          commit('setCanceledSubscriptionTitles', subscriptionTitles)
          commit('setCanceledFrequencyText', frequencyText)
          dispatch('loadInitialData', 'cancel-subscription')
        })
        .catch(function(error) {
          console.log(error)
          alert('Cancel failed - please refresh the page.')
        })
    },

    skipShipmentAction({ commit, dispatch, state }, payload) {
      console.log('skipShipmentAction')

      const { customerHash } = state
      const { date, item_ids, charge_id } = payload
      const interval = 3000
      let promise = Promise.resolve()
      let updatesRequired = 0
      let completedUpdates = 0

      commit('setUpdateOverlay', true)

      commit('setSkipShipmentUpdating', true)
      commit('setSkipShipmentSaved', false)

      item_ids.forEach(function(id) {
        updatesRequired += 1

        let skipShipmentEndpoint = `https://foursigmastore-us.shopifysubscriptions.com/customers/${customerHash}/charges/${charge_id}/skip?date=${date}&charge_id=${charge_id}&item_ids[0]=${id}`

        promise = promise.then(function() {
          axios
            .get(skipShipmentEndpoint)
            .then(function(response) {
              console.log('axios response', response)
              completedUpdates += 1

              // check if updates are completed
              if (updatesRequired === completedUpdates) {
                dispatch('loadInitialData', 'skip-shipment')
              }
            })
            .catch(function(error) {
              console.log('Error', error)
              completedUpdates += 1

              if (updatesRequired === completedUpdates) {
                dispatch('loadInitialData', 'skip-shipment')
              }
            })

          return new Promise(function(resolve) {
            setTimeout(resolve, interval)
          })
        })
      })
    },

    updateBillingAddressAction({ commit, dispatch, state }, payload) {
      console.log('updateBillingAddressAction ')
      console.log('payload', payload)

      const { customerHash } = state

      const { addressUpdates } = payload

      let updateAddressEndpoint = `https://foursigmastore-us.shopifysubscriptions.com/customer/${customerHash}/edit`

      commit('setUpdateOverlay', true)

      commit('setAddressUpdating', true)
      commit('setAddressSaved', false)
      commit('addressUpdateErrors', {})

      axios
        .post(
          updateAddressEndpoint,
          qs.stringify({
            email: addressUpdates.email,
            billing_first_name: addressUpdates.first_name,
            billing_last_name: addressUpdates.last_name,
            billing_address_1: addressUpdates.address1,
            billing_address_2: addressUpdates.address2,
            billing_company: addressUpdates.company,
            billing_country: addressUpdates.country,
            billing_province_state: addressUpdates.province,
            billing_city: addressUpdates.city,
            billing_postalcode: addressUpdates.zip,
            billing_phone: addressUpdates.phone
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01'
            }
          }
        )
        .then(function(response) {
          console.log(response)
          console.log('buildpayload', payload.addressUpdates)
          commit('updateBillingAddressView', payload.addressUpdates)
        })
        .catch(function(error) {
          console.log('error', error)

          // Error
          if (error.response) {
            commit('addressUpdateErrors', error.response.data.errors)
            // that falls out of the range of 2xx
            console.log(error.response.data)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
        })
    },

    updateAddressAction({ commit, dispatch, state }, payload) {
      console.log('updateAddressAction')
      console.log('payload', payload)

      const { customerHash } = state

      const { addressToUpdateId, addressIndex, addressUpdates } = payload

      let updateAddressEndpoint = `/tools/recurring/customer_portal/${customerHash}/addresses/${addressToUpdateId}/edit.json`

      commit('setUpdateOverlay', true)

      commit('setAddressUpdating', true)
      commit('setAddressSaved', false)
      commit('addressUpdateErrors', {})

      axios
        .post(
          updateAddressEndpoint,
          qs.stringify({
            first_name: addressUpdates.first_name,
            last_name: addressUpdates.last_name,
            address1: addressUpdates.address1,
            address2: addressUpdates.address2,
            company: addressUpdates.company,
            country: addressUpdates.country,
            province: addressUpdates.province,
            city: addressUpdates.city,
            zip: addressUpdates.zip,
            phone: addressUpdates.phone
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01'
            }
          }
        )
        .then(function(response) {
          console.log(response)

          let payload = {
            address: response.data.address,
            addressIndex
          }

          commit('setActiveDeliveryAddress', payload.address)
          console.log('buildpayload', payload)
          console.log('updated addresses')

          dispatch('loadInitialData', 'update-address')
        })
        .catch(function(error) {
          // Error
          if (error.response) {
            commit('addressUpdateErrors', error.response.data.errors)
            console.log(error.response.data)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }

          alert('Update failed - please refresh the page.')
        })
    },

    swapProductAction({ commit, state, dispatch }, payload) {
      const { customerHash, subscriptionToSwap } = state

      const { newProductVariantId } = payload

      console.log('swa product action')
      console.log(subscriptionToSwap)

      state.productEditDrawerUpdating = true
      state.productEditDrawerSaved = false

      let updateUrl = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${
        subscriptionToSwap.subscription.id
      }/swap?shopify_variant_id=${newProductVariantId}`

      console.log('updateUrl', updateUrl)
      commit('setUpdateOverlay', true)

      axios
        .post(
          updateUrl,
          qs.stringify({
            quantity: subscriptionToSwap.subscription.quantity,
            order_interval_frequency:
              subscriptionToSwap.subscription.charge_interval_frequency,
            order_interval_unit:
              subscriptionToSwap.subscription.charge_interval_unit,
            first_charge_date: moment(
              subscriptionToSwap.subscription.next_charge_scheduled_at
            ).format('YYYY-MM-DD')
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01'
            }
          }
        )
        .then(function() {
          console.log('swap from recharge')

          dispatch('loadInitialData', 'swap-product')
        })
        .catch(function(error) {
          console.log(error)
          alert('Product swap failed - please refresh the page.')
          commit('setProductEditDrawerUpdating', false)
          commit('setProductEditDrawerSaved', false)
        })
    },

    removeProductAction({ commit, state, dispatch }, payload) {
      console.log('remove product action')

      const { customerHash } = state

      let { subscriptionId } = payload

      state.productEditDrawerUpdating = true
      state.productEditDrawerSaved = false

      const API_CANCEL = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${subscriptionId}/cancel/506774`

      commit('setUpdateOverlay', true)

      axios
        .post(
          API_CANCEL,
          qs.stringify({
            comments: 'Remove Product From Delivery'
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01'
            }
          }
        )
        .then(function(response) {
          console.log('removed from recharge')
          console.log(response)

          dispatch('loadInitialData', 'remove-product')
        })
        .catch(function(error) {
          alert('Update failed - please refresh the page.')
          commit('setProductEditDrawerUpdating', false)
          commit('setProductEditDrawerSaved', false)
          console.log(error)
        })
    },

    updateQuantityAction({ commit, state }, payload) {
      let { subscriptionId, newQuantity } = payload

      const { customerHash } = state

      state.productEditDrawerUpdating = true
      state.productEditDrawerSaved = false

      const UPDATE_API = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${subscriptionId}/edit`

      axios
        .post(
          UPDATE_API,
          qs.stringify({
            quantity: newQuantity
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01'
            }
          }
        )
        .then(function(response) {
          console.log(response)
          console.log('updatequantityview')

          commit('updateQuantityView', payload)
        })
        .catch(function(error) {
          console.log(error)
          state.productEditDrawerUpdating = false
          state.productEditDrawerSaved = true
          alert('Update failed - please refresh the page.')
        })
    },

    addProductAction({ commit, getters, state, dispatch }, productVariantId) {
      console.log('start add product action')

      commit('setUpdateOverlay', true)

      commit('setNewProductAddedSaved', false)

      const {
        baseUrl,
        customerHash,
        activeDeliveryAddressId,
        activeDeliveryFrequency,
        activeDeliveryIntervalUnit
      } = state

      const { activeDeliveryChargeScheduledAt } = getters
      const APIAddProduct = `${baseUrl}${customerHash}/subscriptions/new.json`

      axios
        .post(APIAddProduct, {
          address_id: activeDeliveryAddressId,
          next_charge_date: moment(activeDeliveryChargeScheduledAt).format(
            'YYYY-MM-DD'
          ),
          order_interval_frequency: activeDeliveryFrequency,
          order_interval_unit: activeDeliveryIntervalUnit,
          quantity: 1,
          shopify_variant_id: productVariantId
        })
        .then(response => {
          // console.log(response);

          //  new subscription values
          let newDeliveryItemSubscription = {
            subscription: response.data.subscription,
            title: response.data.subscription.product_title
          }

          // Get shared values
          let currentDeliveryItem = state.activeDeliverySchedule.delivery[0]

          // merge and override subscription {} with new subscription
          let newDeliveryItem = {
            ...currentDeliveryItem,
            ...newDeliveryItemSubscription
          }

          console.log('about to distpatch load initial data from product')
          dispatch('loadInitialData', 'add-product')

          commit('setNewProductAdded', newDeliveryItem)
        })
        .catch(error => {
          console.log(error)
        })
    },

    undoAddProduct({ commit, state, dispatch }, subscriptionId) {
      console.log('undo add product most recent')

      state.updatingRemovingProduct = true

      const { customerHash } = state

      const API_CANCEL = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${
        state.newProductAdded.subscription.id
      }/cancel/506774`

      commit('setUpdateOverlay', true)

      axios
        .post(
          API_CANCEL,
          qs.stringify({
            comments: 'Undo Product Add'
          }),
          {
            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/json, text/javascript, */*; q=0.01'
            }
          }
        )
        .then(function(response) {
          console.log('remove from recharge')
          console.log(response)

          dispatch('loadInitialData', 'undo-add-product')
        })
        .catch(function(error) {
          console.log(error)
          alert('Undo failed - please refresh the page')
          state.newProductAddedSaved = false
          state.updatingRemovingProduct = false
        })
    },

    async loadInitialData({ commit, state }, callbackType) {
      const baseUrl =
        'https://www.dryfarmwines.com/tools/recurring/customer_portal/'

      console.log('loadinitialdata')
      console.log(customerHash)
      console.log(state.customerHash)

      const { customerHash } = state

      let [
        customerAddressSubs,
        orders,
        productsSearch,
        deliverySchedule
      ] = await Promise.all([
        axios.get(`${baseUrl}${customerHash}.json`),
        axios.get(`${baseUrl}${customerHash}/orders.json`),
        axios.get(`${baseUrl}${customerHash}/products/search.json`),
        axios.get(`${baseUrl}${customerHash}/delivery_schedule.json`)
      ])

      if (!customerAddressSubs) {
        alert('Data timeout - please refresh the page.')
      }

      console.log('finish async')
      console.log('customerAddressSubs', customerAddressSubs)
      console.log('orders', orders)
      console.log('products', productsSearch)
      console.log('deliveryschedule', deliverySchedule)

      commit('setCustomer', customerAddressSubs.data.customer)
      commit('setAddresses', customerAddressSubs.data.addresses)
      commit('setSubscriptions', customerAddressSubs.data.subscriptions)
      commit('setOrders', orders.data.orders)
      commit('setProducts', productsSearch.data.rules)
      commit('setDeliverySchedule', deliverySchedule.data.delivery_schedule)
      commit('setInitialRechargeDataLoading', false)

      console.log('callback', callbackType)
      if (
        callbackType &&
        callbackType.name &&
        callbackType.name === 'select-delivery-frequency'
      ) {
        commit('setActiveDeliveryFrequency', callbackType.intervalFrequency)
        commit('setFrequencySaved', true)
        commit('setFrequencyUpdating', false)
      }

      if (callbackType === 'edit-ships-on') {
        commit('setShipsOnUpdating', false)
        commit('setShipsOnSaved', true)
      }

      if (callbackType === 'combine-subscriptions') {
        commit('setCombineSubscriptionsUpdating', false)
        commit('setCombineSubscriptionsSaved', true)
      }

      if (callbackType === 'skip-shipment') {
        commit('setSkipShipmentUpdating', false)
        commit('setSkipShipmentSaved', true)
      }

      if (callbackType === 'undo-add-product') {
        commit('undoAddProductView')
      }

      if (callbackType === 'add-product') {
        commit('setNewProductAddedSaved', true)
        commit('setDrawerContentType', 'editProduct')
      }

      if (callbackType == 'remove-product') {
        commit('removeProduct')
      }

      if (callbackType === 'cancel-subscription') {
        commit('setSubscriptionCanceled', true)
        commit('setCancellationUpdating', false)
        commit('setActiveDeliveryScheduleIndex', 0)
        commit('openModal')
      }

      if (callbackType === 'update-address') {
        commit('updateAddressView')
      }

      if (callbackType === 'swap-product') {
        commit('setDrawerContentType', 'editProduct')
        commit('setProductEditDrawerUpdating', false)
        commit('setProductEditDrawerSaved', true)
      }

      console.log('loadinitaldata compete')
      commit('setUpdateOverlay', false)
    }
  }
})
