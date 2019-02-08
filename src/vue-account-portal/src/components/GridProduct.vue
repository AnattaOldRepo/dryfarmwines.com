<template>
  <div class="c-subProductGrid__product">
    <div class="c-subProduct__productImageBox">
      <img
        :src="productImageSrc"
        class="c-subProduct__productImage"
      />
    </div>

    <div class="c-subProduct__productInfoBox">
      <h4 class="c-subProduct__productTitle">
        {{ product.shopify_product.title }}
      </h4>

      <span class="c-subProduct__productPrice">
        {{ productPrice }}
      </span>

      <base-button @click="setProductModal">
        {{ updating ? '...' : 'Add' }}
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data: () => ({ updating: false, showProductModal: false }),

  computed: {
    ...mapState([
      'baseUrl',
      'customerHash',
      'activeDeliverySchedule',
      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit'
    ]),

    ...mapGetters([
      'activeDeliveryChargeScheduledAt',
      'activeDeliveryScheduleGetter'
    ]),

    shopifyProduct() {
      return this.product.shopify_product
    },

    productVariant() {
      return this.product.shopify_product.variants[0]
    },

    productPrice() {
      // has decimal in it
      let variantPrice = parseInt(this.productVariant.price)
      variantPrice = variantPrice * 0.8
      variantPrice = variantPrice.toFixed(2)

      variantPrice = variantPrice.toString().replace('.', '')

      return this.formatMoney(variantPrice)
    },

    productImageSrc() {
      if (
        this.product.shopify_product &&
        this.product.shopify_product.image &&
        this.product.shopify_product.image.src
      ) {
        return this.product.shopify_product.image.src
      }

      return false
    }
  },

  methods: {
    ...mapActions(['addProductAction']),

    ...mapMutations('ui', ['openAddProductModal']),

    setProductModal() {
      this.openAddProductModal({ product: this.shopifyProduct })
    },

    addProduct() {
      this.updating = true
      this.addProductAction({ shopify_variant_id: this.productVariant.id })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/components/grid-product.scss';
</style>
