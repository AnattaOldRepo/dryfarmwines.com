const allowedProductIds = [
  1413378113634,
  10015596240,
  10015624528,
  10015590096,
  1336329633884
]

export const filterProducts = products => {
  return products.filter(
    product => allowedProductIds.indexOf(product.shopify_product_id) !== -1
  )
}
