<template>
  <div class="c-rDrawerEditProduct">
    <span class="c-rDrawer__title">Swap Products</span>

    <span class="c-rDrawer__subtitle">Current Products</span>

    <div
      class="c-editProduct__lineitems"
      v-if="activeDeliveryScheduleGetter"
    >
      <div
        class="c-editProduct__lineitem"
        v-for="(item, index) in activeDeliveryScheduleGetter.delivery"
        :key="index"
      >
        <div class="c-editProduct__lineitemContent">
          <div class="c-editProduct__lineitemImageBox">
            <img
              :src="getProductVariantImage(products, item.subscription)"
              alt=""
            />
          </div>

          <div>
            <p>
              {{ item.subscription.product_title }}
            </p>
            <span>{{
              formatMoney(item.subscription.price * item.subscription.quantity)
              }}</span>
          </div>
        </div>

        <div class="c-editProduct__lineitemEdit">
          <div class="c-rDrawerProduct__actionBox">
            <a
              class="c-rButton c-rButton--red"
              @click.prevent="swapProductSetup(item, index)"
            >Swap</a>
          </div>
        </div>
      </div>
    </div>

    <div
      class="c-rDrawer__updateMessage"
      v-if="productEditDrawerUpdating"
    >
      <span class="c-rDrawer__updateMessageText">Updating...</span>
    </div>

    <div
      class="c-rDrawer__updateMessage"
      v-if="productEditDrawerSaved"
      transition="fade"
    >
      <span class="c-rDrawer__updateMessageText c-rDrawer__updateMessageText--success">SAVED</span>
      <div class="c-rDrawer__updateMessageIcon--save">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 26"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 26 26"
        >
          <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import productVariantImage from '@/mixins/productVariantImage'

export default {
  name: 'DrawerRetentionEditProducts',

  mixins: [productVariantImage],

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',

      'productEditDrawerUpdating',
      'productEditDrawerSaved',
      'products'
    ]),

    ...mapGetters(['activeDeliveryScheduleGetter'])
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',

      'setSubscriptionToSwap'
    ]),

    ...mapActions(['updateQuantityAction', 'removeProductAction']),

    swapProductSetup(item, index) {
      console.log('swpproductsetup')
      console.log('item', item)

      let payload = {}

      payload = {
        subscriptionToSwap: item,
        indexInDelivery: index
      }

      this.setSubscriptionToSwap(payload)
      this.setDrawerContentType('swapProduct')
    },

    closeDrawerAndResetType() {
      this.closeDrawer()
      setTimeout(() => {
        this.resetType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/components/drawer-retention-edit-products';
</style>
