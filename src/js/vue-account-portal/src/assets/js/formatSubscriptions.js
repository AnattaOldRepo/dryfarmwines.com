export const formatSubscriptions = rawSubscriptions => {
  let subscriptionsObject = {}
  rawSubscriptions.forEach(subscription => {
    if (subscription.is_active) {
      subscriptionsObject[subscription.id] = subscription
    }
  })
  return subscriptionsObject
}
