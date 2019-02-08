<template>
  <div class="c-rDrawerProduct">
    <div class="c-rDrawerProduct__info">
      <div class="c-rDrawerProduct__imageBox">
        <img :src="productImages[product.shopify_product_id]" />
      </div>

      <div class="c-rDrawerProduct__contentBox">
        <p class="c-rDrawerProduct__title">
          {{ product.shopify_product.title }}
        </p>
        <span class="c-rDrawerProduct__price">{{ productPrice }}</span>
      </div>
    </div>

    <div
      class="c-rDrawerProduct__actionBox"
      v-if="drawerContentType === 'swapProduct'"
    >
      <base-button @click.prevent="swapProduct">
        {{ !updating ? 'SWAP' : 'Updating...' }}
      </base-button>
    </div>

    <div
      class="c-rDrawerProduct__actionBox"
      v-if="drawerContentType === 'addProduct'"
    >
      <base-button @click.prevent="addProduct">
        {{ !updating ? 'Add & Subscribe' : 'Updating...' }}
      </base-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'DrawerProduct',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data: () => ({ updating: false }),

  computed: {
    ...mapState([
      'drawerContentType',
      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit'
    ]),

    ...mapGetters([
      'productImages',
      'activeDeliveryChargeScheduledAt',
      'activeDeliveryScheduleGetter'
    ]),

    productVariant() {
      return this.product.shopify_product.variants[0]
    },

    productVariantId() {
      return this.productVariant.id
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
    ...mapMutations(['setNewProductAdded', 'setNewProductAddedSaved']),

    ...mapMutations('ui', ['openAddProductModal']),

    ...mapActions(['swapProductAction', 'addProductAction']),

    addProduct() {
      this.openAddProductModal({
        product: this.product.shopify_product,
        mode: 'add to current subscription'
      })
    },

    swapProduct() {
      this.openAddProductModal({
        product: this.product.shopify_product,
        mode: 'swap'
      })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/components/drawer-product';
</style>
