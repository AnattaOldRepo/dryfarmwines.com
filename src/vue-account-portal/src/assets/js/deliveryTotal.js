import { isEmptyObject } from './isEmptyObject'

export const deliveryTotal = delivery => {
  if (!isEmptyObject(delivery)) {
    let total = 0
    const subscription = delivery.delivery
    Object.keys(subscription).forEach(item => {
      total +=
        subscription[item].subscription.price *
        subscription[item].subscription.quantity
    })
    return total
  }
}
