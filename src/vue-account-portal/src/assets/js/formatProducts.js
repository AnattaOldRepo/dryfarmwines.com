export const formatProducts = rawProducts => {
  let productsObject = {}
  rawProducts.forEach(product => {
    productsObject[product.shopify_product.id] = product
    const variants = product.shopify_product.variants
    const images = product.shopify_product.images
    productsObject[product.shopify_product.id].shopify_product.variants = {}
    productsObject[product.shopify_product.id].shopify_product.images = {}
    variants.forEach(variant => {
      productsObject[product.shopify_product.id].shopify_product.variants[
        variant.id
      ] = variant
    })
    images.forEach(image => {
      productsObject[product.shopify_product.id].shopify_product.images[
        image.id
      ] = image
    })
  })
  return productsObject
}
