export const setCustomerHash = (state, value) => {
  state.customerHash = value
}

export const setCanceledFrequencyText = (state, value) => {
  state.canceledFrequencyText = value
}

export const setCancellationUpdating = (state, value) => {
  state.cancellationUpdating = value
}

export const setFrequencyUpdating = (state, value) => {
  state.frequencyUpdating = value
}

export const setFrequencySaved = (state, value) => {
  state.frequencySaved = value
}

export const updateQuantityView = (state, payload) => {
  let { indexInDelivery, newQuantity } = payload

  console.log('update quantity view')
  state.activeDeliverySchedule.delivery[
    indexInDelivery
  ].subscription.quantity = newQuantity
  state.productEditDrawerUpdating = false
  state.productEditDrawerSaved = true
}

export const setInitialRechargeDataLoading = (state, value) => {
  state.initialRechargeDataLoading = value
}

export const setCustomer = (state, value) => {
  state.customer = value
}

export const setOrders = (state, value) => {
  state.orders = value
}

export const closeDrawer = state => {
  state.drawerOpen = false

  // reset save states
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
}

export const closeModal = state => {
  state.modalOpen = false
  state.subscriptionCanceled = false
}

export const updateBillingAddressView = (state, payload) => {
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
}

export const setUpdateOverlay = (state, value) => {
  state.updateOverlay = value
}

export const setDrawerContentType = (state, value) => {
  state.drawerContentType = value
}

export const openDrawer = state => {
  state.drawerOpen = true
}

export const toggleDrawer = state => {
  state.drawerOpen = !state.drawerOpen
}

export const openModal = state => {
  state.modalOpen = true
}

export const toggleModal = state => {
  state.modalOpen = !state.modalOpen
}

export const setActiveDeliverySchedule = (state, value) => {
  state.activeDeliverySchedule = value
}

export const setActiveDeliveryScheduleIndex = (state, value) => {
  state.activeDeliveryScheduleIndex = value
}

export const setActiveFirstDeliverySubscription = (state, value) => {
  state.activeFirstDeliverySubscription = value
}

export const setActiveDeliveryAddress = (state, value) => {
  state.activeDeliveryAddress = value
}

export const setActiveDeliveryAddressId = (state, value) => {
  state.activeDeliveryAddressId = value
}

export const setActiveDeliveryFrequency = (state, value) => {
  state.activeDeliveryFrequency = value
}

export const setActiveDeliveryIntervalUnit = (state, value) => {
  state.activeDeliveryIntervalUnit = value
}

export const setDeliverySchedule = (state, value) => {
  console.log('setDeliverySchedule')
  console.log(value)

  state.deliverySchedule = [...state.deliverySchedule, ...value]
}

export const setAddressUpdating = (state, value) => {
  state.addressUpdating = value
}

export const setAddressSaved = (state, value) => {
  state.addressSaved = value
}

export const addressUpdateErrors = (state, errors) => {
  state.addressUpdateErrors = errors
}

export const updateAddressView = state => {
  state.addressSaved = true
  state.addressUpdating = false
}

export const setAddresses = (state, value) => {
  state.addresses = value
}

export const setProductEditDrawerUpdating = (state, value) => {
  state.productEditDrawerUpdating = value
}

export const setProductEditDrawerSaved = (state, value) => {
  state.productEditDrawerSaved = value
}

export const removeProduct = state => {
  console.log('update remove product view states')
  state.productEditDrawerUpdating = false
  state.productEditDrawerSaved = true
}

export const undoAddProductView = state => {
  console.log('remove from view')
  state.newProductAdded = {}
  state.newProductAddedSaved = false
  state.updatingRemovingProduct = false
}

export const setNewProductAdded = (state, value) => {
  state.newProductAdded = value
}

export const setNewProductAddedSaved = (state, value) => {
  state.newProductAddedSaved = value
}

export const setProducts = (state, value) => {
  state.products = value
}

export const setShipsOnUpdating = (state, value) => {
  state.shipsOnUpdating = value
}

export const setShipsOnSaved = (state, value) => {
  state.shipsOnSaved = value
}

export const setSkipShipmentUpdating = (state, value) => {
  state.skipShipmentUpdating = value
}

export const setSkipShipmentSaved = (state, value) => {
  state.skipShipmentSaved = value
}

export const setCanceledSubscriptionTitles = (state, value) => {
  state.canceledSubscriptionTitles = value
}

export const setSubscriptions = (state, value) => {
  state.subscriptions = value
}

export const setSubscriptionCanceled = (state, value) => {
  state.subscriptionCanceled = value
}

export const setSubscriptionToSwap = (state, payload) => {
  const { subscriptionToSwap, indexInDelivery } = payload

  state.subscriptionToSwap = subscriptionToSwap
  state.subscriptionToSwapIndex = indexInDelivery
}

export const setCombineSubscriptionsUpdating = (state, value) => {
  state.combineSubscriptionsUpdating = value
}

export const setCombineSubscriptionsSaved = (state, value) => {
  state.combineSubscriptionsSaved = value
}
