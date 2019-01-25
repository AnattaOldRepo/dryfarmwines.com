import store from '../../store'
import axios from 'axios'
import moment from 'moment'
import { isEmptyObject } from './isEmptyObject'
import { rechargeUrl } from '../../config.js'

export async function loadRechargeData(customerHash) {
  const [
    rechargeCustomer,
    rechargeOrders,
    rechargeProducts,
    rechargeDeliveries
  ] = await Promise.all([
    axios.get(`${rechargeUrl}${customerHash}.json`),
    axios.get(`${rechargeUrl}${customerHash}/orders.json`),
    axios.get(`${rechargeUrl}${customerHash}/products/search.json`),
    axios.get(`${rechargeUrl}${customerHash}/delivery_schedule.json`)
  ])

  const deliverySchedule = rechargeDeliveries.data.delivery_schedule
  const prouctCatalog = rechargeProducts.data.rules
  const addressBook = rechargeCustomer.data.addresses
  const customerProfile = rechargeCustomer.data.customer
  const subscriptionList = rechargeCustomer.data.subscriptions
  const orderHistory = rechargeOrders.data.orders

  let activeDeliverySchedule = []

  if (deliverySchedule.length > 0) {
    deliverySchedule.map(date => {
      date.delivery.find(subscription => {
        if (!subscription.is_skipped) {
          activeDeliverySchedule.push(date)
        }
      })
    })
  }

  const activeSubscription =
    activeDeliverySchedule.length > 0
      ? deliverySchedule[0].delivery[0].subscription
      : subscriptionList.length > 0
      ? subscriptionList[0].is_active
        ? subscriptionList[0]
        : false
      : false

  const activeSubscriptionId = activeSubscription
    ? activeSubscription.id
    : false

  const activeDeliveryDate =
    activeDeliverySchedule.length > 0
      ? activeDeliverySchedule[0].date
      : moment().format('YYYY-MM-DD')

  const activeDeliveryInterval = activeSubscription
    ? activeSubscription.charge_interval_frequency
    : false

  const activeAddressId = activeSubscription
    ? activeSubscription.address.id
    : false
  const addresses = addressBook.length > 0 ? addressBook : false
  const deliveries = !isEmptyObject(activeDeliverySchedule)
    ? activeDeliverySchedule
    : false
  const customer = !isEmptyObject(customerProfile) ? customerProfile : false
  const products = !isEmptyObject(prouctCatalog) ? prouctCatalog : false
  const subscriptions = !isEmptyObject(subscriptionList)
    ? subscriptionList
    : false
  const orders = !isEmptyObject(orderHistory) ? orderHistory : false

  if (activeAddressId) {
    store.commit('addresses/setActiveAddressId', activeAddressId)
  }
  if (addresses) {
    store.commit('addresses/setAddresses', addresses)
  }
  if (customer) {
    store.commit('customer/setCustomer', customer)
  }
  if (activeDeliveryDate) {
    store.commit('deliveries/setActiveDeliveryDate', activeDeliveryDate)
  }
  if (activeDeliveryInterval) {
    store.commit('deliveries/setDeliveryInterval', activeDeliveryInterval)
  }
  if (deliveries) {
    store.commit('deliveries/setDeliveries', deliveries)
  }
  if (products) {
    store.commit('products/setProducts', products)
  }
  if (activeSubscriptionId) {
    store.commit('subscriptions/setActiveSubscriptionId', activeSubscriptionId)
  }
  if (subscriptions) {
    store.commit('subscriptions/setSubscriptions', subscriptions)
  }
  if (orders) {
    store.commit('orders/setOrders', orders)
  }
  store.commit('ui/clearAppLoading')
}
