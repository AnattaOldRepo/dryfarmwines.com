import axios from 'axios'
import moment from 'moment'
import qs from 'qs'

export const updateQuantityAction = ({ commit, state }, payload) => {
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
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
}

export const loadInitialData = async ({ commit, state }, callbackType) => {
  const baseUrl =
    'https://www.dryfarmwines.com/tools/recurring/customer_portal/'

  console.log('loadinitialdata')
  console.log(customerHash)
  console.log(state.customerHash)

  const { customerHash } = state

  let customerAddressSubs = await axios.get(`${baseUrl}${customerHash}.json`)
  let orders = await axios.get(`${baseUrl}${customerHash}/orders.json`)
  let productsSearch = await axios.get(
    `${baseUrl}${customerHash}/products/search.json`
  )
  let deliverySchedule = await axios.get(
    `${baseUrl}${customerHash}/delivery_schedule.json`
  )

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

  console.log('loadinitaldata complete')
  commit('setUpdateOverlay', false)
}

export const selectDeliveryFrequencyAction = (
  { commit, dispatch, state },
  payload
) => {
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
}

export const updateAddressAction = ({ commit, dispatch, state }, payload) => {
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
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
}

export const updateBillingAddressAction = ({ commit, state }, payload) => {
  console.log('updateBillingAddressAction ')
  console.log('payload', payload)

  const { customerHash } = state

  const { addressUpdates } = payload

  let updateAddressEndpoint = `https://dryfarmwines.shopifysubscriptions.com/customer/${customerHash}/edit`

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
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
}

export const swapProductAction = ({ commit, state, dispatch }, payload) => {
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
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
}

export const removeProductAction = ({ commit, state, dispatch }, payload) => {
  console.log('remove product action')

  const { customerHash } = state

  let { subscriptionId } = payload

  state.productEditDrawerUpdating = true
  state.productEditDrawerSaved = false

  const API_CANCEL = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${customerHash}/subscriptions/${subscriptionId}/cancel?preview_theme=1792`

  commit('setUpdateOverlay', true)

  axios
    .post(
      API_CANCEL,
      qs.stringify({
        comments: 'Remove Product From Delivery'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
}

export const addProductAction = (
  { commit, getters, state, dispatch },
  productVariantId
) => {
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
}

export const undoAddProduct = ({ commit, state, dispatch }) => {
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
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
}

export const changeShipmentDateAction = (
  { commit, dispatch, state },
  payload
) => {
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
}

export const skipShipmentAction = ({ commit, dispatch, state }, payload) => {
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

    let skipShipmentEndpoint = `https://dryfarmwines.shopifysubscriptions.com/customers/${customerHash}/charges/${charge_id}/skip?date=${date}&charge_id=${charge_id}&item_ids[0]=${id}`

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
}

export const combineSubscriptionsAction = ({
  commit,
  dispatch,
  state,
  getters
}) => {
  const { customerHash } = state
  const promises = []

  const chargeIntervalFrequency =
    getters.uniqueDeliveries[0].delivery[0].subscription
      .charge_interval_frequency
  const chargeIntervalUnit =
    getters.uniqueDeliveries[0].delivery[0].subscription.charge_interval_unit
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
}

export const cancelSubscriptionAction = (
  { commit, dispatch, state },
  payload
) => {
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
}
