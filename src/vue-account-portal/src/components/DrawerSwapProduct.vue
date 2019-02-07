<template>
  <div class="c-rDrawerSwapProduct">
    <span class="c-rDrawer__title">Swap Products</span>

    <span class="c-rDrawer__subtitle">Current Product</span>

    <div
      class="c-rDrawerProduct"
      style="30px 16px 8px 30px; margin-bottom: 28px"
    >
      <div
        class="c-rDrawerProduct__info"
        style="margin-bottom: 0"
      >
        <div class="c-rDrawerProduct__imageBox">
          <img :src="getProductVariantImage(products, subscriptionToSwap.subscription)" />
        </div>

        <div class="c-rDrawerProduct__contentBox">
          <p class="c-rDrawerProduct__title">
            {{ subscriptionToSwap.subscription.product_title }}
          </p>
          <span class="c-rDrawerProduct__price">{{
            formatMoney(subscriptionToSwap.subscription.price)
            }}</span>
        </div>
      </div>
    </div>

    <span class="c-rDrawer__subtitle">Select Your New Product</span>

    <drawer-product
      v-for="product in availableProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import productVariantImage from '@/mixins/productVariantImage'
import DrawerProduct from '@/components/DrawerProduct'

export default {
  name: 'DrawerSwapProduct',

  components: {
    DrawerProduct
  },

  props: {
    products: {
      type: Array,
      required: true
    },

    subscriptions: {
      type: Array,
      required: true
    }
  },

  mixins: [productVariantImage],

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'products',
      'subscriptionToSwap',
      'subscriptionToSwapIndex'
    ]),

    ...mapGetters([
      'activeSubscriptions',
      'activeProducts',
      'availableProducts',
      'productImages'
    ])
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer'
    ]),

    closeDrawerAndResetType() {
      this.closeDrawer()
      setTimeout(() => {
        this.resetType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss">
.c-rDrawerSwapProduct {
  margin-left: -30px;
  margin-right: -30px;

  .c-rDrawer__subtitle {
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 2px;
    font-weight: 700;
    letter-spacing: 2px;
    display: block;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 13px;
  }
}
</style>
