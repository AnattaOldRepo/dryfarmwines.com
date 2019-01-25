export const formatCustomer = rawCustomer => {
  let billingAddress = {}
  let paymentMethod = {}
  let profile = {}
  Object.keys(rawCustomer).map(key => {
    if (key.indexOf('billing') !== -1) {
      billingAddress[key] = rawCustomer[key]
    } else if (key === 'customer_card') {
      paymentMethod = { ...rawCustomer[key] }
    } else {
      profile[key] = rawCustomer[key]
    }
  })
  return {
    billingAddress,
    paymentMethod,
    profile
  }
}
