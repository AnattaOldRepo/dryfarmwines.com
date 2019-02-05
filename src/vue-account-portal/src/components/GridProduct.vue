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

      <base-button @click="showProductModal = true">
        {{ updating ? '...' : 'Add' }}
      </base-button>
    </div>
    <transition name="fade">
      <modal-add-product
        v-if="showProductModal"
        :hideModal="() => showProductModal = false"
        :product="shopifyProduct"
      />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import ModalAddProduct from './ModalAddProduct'

export default {
  components: {
    ModalAddProduct
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data: () => ({ updating: false, showProductModal: false }),

  mounted() {
    console.log(this.product)
  },

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

    addProduct() {
      this.updating = true
      this.addProductAction({ shopify_variant_id: this.productVariant.id })
    }
  }
}
</script>

<style lang="scss">
.c-subProductGrid__product {
  padding: 0 10px;

  @media (max-width: 1023px) {
    .c-rButton {
      padding: 10px 16px;
    }
  }
}

.c-subProduct__productImageBox {
  width: 70%;
  margin: 0 auto;
  min-width: 160px;
  max-width: 160px;
}

.c-subProduct__productImage {
  max-width: 100%;
}

.c-subProduct__productInfoBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.c-subProduct__productTitle {
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0;
  margin-bottom: 13px;
  text-align: center;
}

.c-subProduct__productPrice {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0;
  margin-bottom: 13px;
}
</style>
