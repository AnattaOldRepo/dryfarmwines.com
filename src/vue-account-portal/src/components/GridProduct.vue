<template>
  <div class="c-subProductGrid__product">
    <div class="c-subProduct__productImageBox">
      <img :src="productImageSrc" class="c-subProduct__productImage" />
    </div>

    <div class="c-subProduct__productInfoBox">
      <h4 class="c-subProduct__productTitle">
        {{ product.shopify_product.title }}
      </h4>

      <span class="c-subProduct__productPrice">
        {{ productPrice }}
      </span>

      <a class="c-rButton c-rButton--red" @click="addProduct">
        <div>
          <span v-if="updating">...</span>
          <span v-else>Add</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'GridProduct',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      updating: false
    }
  },

  mounted() {},

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
    },

    APIAddProduct() {
      return `${this.baseUrl}${this.customerHash}/subscriptions/new.json`
    }
  },

  methods: {
    ...mapMutations(['setNewProductAdded', 'setNewProductAddedSaved']),

    ...mapActions(['addProductAction']),

    addProduct() {
      console.log('addProduct in drawer product')

      const { productVariantId } = this

      this.updating = true
      this.addProductAction(productVariantId)
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

.c-subProduct__productButton {
}
</style>
