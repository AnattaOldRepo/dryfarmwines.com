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
              :src="getProductVariantImage(item.subscription)"
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
      'productEditDrawerSaved'
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

<style lang="scss">
.c-rDrawerEditProduct {
  .c-rDrawerEditProduct__shipText {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0;
    text-align: center;
    display: block;
  }

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
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  letter-spacing: 0;
}

.c-rDrawerProduct__actionBox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 0;
}

.c-editProduct__lineitemEdit {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.c-editProduct__lineitemImageBox {
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

.c-editProduct__lineitemButtonBox {
  .c-rButton {
    margin-bottom: 10px;
  }
}

.c-editProduct__lineitemQuantityBox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  span {
    padding: 7px 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.c-editProduct__lineitemQuantity {
      border: 1px solid black;
    }
  }

  svg {
    width: 10px;
    height: 10px;
  }
}
</style>
