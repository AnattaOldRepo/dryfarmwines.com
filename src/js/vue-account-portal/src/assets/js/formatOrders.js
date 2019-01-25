export const formatOrders = rawOrders => {
  let ordersObject = {}
  rawOrders.forEach(order => {
    ordersObject[order.id] = order
    const lineItems = ordersObject[order.id].line_items
    ordersObject[order.id].line_items = {}
    lineItems.forEach(item => {
      ordersObject[order.id].line_items[item.shopify_product_id] = item
    })
  })
  return ordersObject
}
