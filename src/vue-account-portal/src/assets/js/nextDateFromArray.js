export const nextDateFromArray = deliveryArray => {
  let nextDate
  let dateDiff
  let newDateDiff
  let currentDate = new Date()
  deliveryArray.forEach(delivery => {
    if (delivery.date > currentDate) newDateDiff = delivery.date - currentDate
    if (!dateDiff) {
      dateDiff = newDateDiff
      nextDate = delivery.date
    } else {
      if (newDateDiff < dateDiff) {
        dateDiff = newDateDiff
        nextDate = delivery.date
      }
    }
  })
  return nextDate
}
