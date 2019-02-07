export default {
  methods: {
    getProductVariantImage(products, subscriptionProduct) {
      const { shopify_product_id, shopify_variant_id } = subscriptionProduct
      const product = products.find(
        p => p.shopify_product_id === Number(shopify_product_id)
      )

      if (product) {
        const defaultImage = product.shopify_product.image
        const { image_id } = product.shopify_product.variants.find(
          variant => variant.id === Number(shopify_variant_id)
        )

        const image = product.shopify_product.images.find(
          image => image.id === image_id
        )

        return image ? image.src : defaultImage.src
      }
    }
  }
}
