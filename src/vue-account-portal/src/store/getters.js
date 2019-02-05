export const initialRechargeDataLoadingGetter = state =>
  state.initialRechargeDataLoading

export const activeDeliveryScheduleGetter = (state, getters) => {
  const { uniqueDeliveries } = getters
  const { activeDeliveryScheduleIndex } = state

  return uniqueDeliveries[activeDeliveryScheduleIndex]
}

export const activeDeliveryChargeScheduledAt = (state, getters) => {
  if (
    getters.uniqueDeliveries &&
    state.activeDeliveryScheduleIndex !== null &&
    getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
  ) {
    return getters.uniqueDeliveries[state.activeDeliveryScheduleIndex]
      .delivery[0].subscription.next_charge_scheduled_at
  }
}

export const activeDeliveryAddressGetter = state => state.activeDeliveryAddress

export const uniqueDeliveries = state => {
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

    let longestArrLength = arr1.length > arr2.length ? arr1.length : arr2.length
    let same = true

    for (let i = 0; i < longestArrLength; i++) {
      if (arr1[i] !== arr2[i]) {
        same = false
      }
    }

    return same
  }

  // loop each delivery schedule
  deliverySchedule.forEach((scheduleItem, index) => {
    // setup internal array, to hold sub ids
    subIdGroupsByDeliveryIndex[index] = []

    // set each internal subscription ID into interal array of sub ids
    // inside object keyed by delivery index, so we can figure out
    // where there's overlap in deliveries
    scheduleItem.delivery.forEach(item => {
      // console.log('item in uniquedelivery loop', item)

      if (!item.is_skipped && !item.subscription.is_one_time_product) {
        // console.log('subIdGroupsByDeliveryIndex[index].push(item.subscription.id)', item.subscription.id)

        subIdGroupsByDeliveryIndex[index].push(item.subscription.id)
      }
    })
  })

  // console.log('subIdGroupsByDeliveryIndex', subIdGroupsByDeliveryIndex)

  // key === index in deliverySchedule array
  Object.keys(subIdGroupsByDeliveryIndex).forEach(key => {
    let currentSubIdArr = subIdGroupsByDeliveryIndex[key]

    // add first one always
    if (!finalUniqueDeliveries.length) {
      // console.log('first check sub ID arr', currentSubIdArr)

      // Make sure delivery has non-skipped items
      if (currentSubIdArr.length) {
        // console.log('force add first', deliverySchedule[key])

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
          // console.log('same values: ', compareArr, currentSubIdArr)
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

export const billingAddressGetter = state => {
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
}

export const productImages = state => {
  let productImagesById = {}

  state.products.forEach(product => {
    productImagesById[product.shopify_product_id] =
      product.shopify_product.image.src
  })

  return productImagesById
}

// return only products that aren't currently set in a subscription
export const availableProducts = (state, getters) => {
  const { products } = state
  const { activeSubscriptions } = getters

  let activeShopifyProductIds = []

  activeSubscriptions.forEach(subscription => {
    activeShopifyProductIds.push(subscription.shopify_product_id)
  })

  return products.filter(
    product => !activeShopifyProductIds.includes(product.shopify_product_id)
  )
}

export const activeSubscriptions = state => {
  return state.subscriptions.filter(
    subscription => subscription.status === 'ACTIVE'
  )
}
