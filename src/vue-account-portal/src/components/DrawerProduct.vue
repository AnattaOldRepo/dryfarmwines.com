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
      <a class="c-rButton c-rButton--red" @click.prevent="swapProduct">
        <span v-if="!updating">SWAP</span>
        <span v-else>Updating...</span>
      </a>
    </div>

    <div
      class="c-rDrawerProduct__actionBox"
      v-if="drawerContentType === 'addProduct'"
    >
      <a class="c-rButton c-rButton--red" @click.prevent="addProduct">
        <span v-if="!updating">Add & Subscribe</span>
        <span v-else>Updating...</span>
      </a>
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

  data: function() {
    return {
      updating: false
    }
  },

  mounted() {},

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

    ...mapActions(['swapProductAction', 'addProductAction']),

    addProduct() {
      console.log('addProduct in drawer product')
      this.updating = true
      this.addProductAction(this.productVariantId)
    },

    swapProduct() {
      const payload = {
        newProductVariantId: this.productVariantId,
        newProduct: this.product
      }

      this.updating = true
      this.swapProductAction(payload)
    }
  }
}
</script>

<style lang="scss">
.c-rDrawerProduct {
  background-color: #fff;
  margin-bottom: 4px;
  padding: 30px 16px 30px 30px;

  .c-rDrawerProduct__info {
    margin-bottom: 24px;
    display: flex;
  }

  .c-rDrawerProduct__imageBox {
    width: 50px;
    margin-right: 20px;
    box-sizing: border-box;
    display: block;

    img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }

  .c-rDrawerProduct__contentBox {
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    letter-spacing: 0;
    padding: 10px 0px;
  }

  .c-rDrawerProduct__title {
  }

  .c-rDrawerProduct__price {
  }

  .c-rDrawerProduct__actionBox {
    // margin-top: 30px;
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .c-rDrawerProduct__button {
  }

  .c-editProduct__lineitems {
    margin-left: -30px;
    margin-right: -30px;
  }

  .c-editProduct__lineitem {
    background-color: #fff;
    margin-bottom: 4px;
    padding: 30px 16px 30px 30px;
  }

  .c-editProduct__lineitemContent {
    display: flex;
  }

  .c-editProduct__lineitemInfoBox {
    margin-bottom: 24px;
  }

  .c-rDrawerProduct__actionBox {
  }

  .c-editProduct__lineitemButtonBox {
    .c-rButton {
      margin-bottom: 10px;
    }
  }
}
</style>
