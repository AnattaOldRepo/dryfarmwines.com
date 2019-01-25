export const formatDeliveries = rawDeliveries => {
  let deliveriesObject = {}
  rawDeliveries.forEach(delivery => {
    deliveriesObject[delivery.date] = { ...delivery }
    deliveriesObject[delivery.date]['delivery'] = {}
    delivery.delivery.forEach(entry => {
      deliveriesObject[delivery.date]['delivery'][entry.subscription.id] = entry
    })
  })
  return deliveriesObject
}
