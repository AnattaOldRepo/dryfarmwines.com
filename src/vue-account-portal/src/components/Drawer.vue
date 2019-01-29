<template>
  <div
    class="c-rDrawer"
    :class="{ 'is-open': drawerOpen }"
  >
    <div class="c-rDrawer__inner">
      <component
        v-if="drawerContentType"
        :is="drawers[drawerContentType]"
        :products="products"
        :subscriptions="subscriptions"
      />
    </div>

    <span
      class="c-rDrawer__close"
      @click="closeDrawerAndResetType"
    >
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="95.939px"
        height="95.939px"
        viewBox="0 0 95.939 95.939"
        style="enable-background:new 0 0 95.939 95.939;"
        xml:space="preserve"
      >
        <g>
          <path d="M62.819,47.97l32.533-32.534c0.781-0.781,0.781-2.047,0-2.828L83.333,0.586C82.958,0.211,82.448,0,81.919,0
                    c-0.53,0-1.039,0.211-1.414,0.586L47.97,33.121L15.435,0.586c-0.75-0.75-2.078-0.75-2.828,0L0.587,12.608
                    c-0.781,0.781-0.781,2.047,0,2.828L33.121,47.97L0.587,80.504c-0.781,0.781-0.781,2.047,0,2.828l12.02,12.021
                    c0.375,0.375,0.884,0.586,1.414,0.586c0.53,0,1.039-0.211,1.414-0.586L47.97,62.818l32.535,32.535
                    c0.375,0.375,0.884,0.586,1.414,0.586c0.529,0,1.039-0.211,1.414-0.586l12.02-12.021c0.781-0.781,0.781-2.048,0-2.828L62.819,47.97
                    z" />
        </g>
      </svg>
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import DrawerEditProduct from '../components/DrawerEditProduct.vue'
import DrawerSwapProduct from '../components/DrawerSwapProduct.vue'
import DrawerAddProduct from '../components/DrawerAddProduct.vue'
import DrawerEditShipDate from '../components/DrawerEditShipDate.vue'
import DrawerEditFrequency from '../components/DrawerEditFrequency.vue'
// import DrawerEditAddress from '../components/DrawerEditAddress.vue'
import DrawerAddAddress from '../components/DrawerAddAddress.vue'
import DrawerEditPayment from '../components/DrawerEditPayment.vue'
import DrawerEditBillingAddress from '../components/DrawerEditBillingAddress.vue'
import DrawerShippingAddresses from '../components/DrawerShippingAddresses.vue'
import DrawerRetentionEditProducts from '../components/DrawerRetentionEditProducts.vue'

export default {
  name: 'Drawer',

  components: {
    DrawerEditProduct,
    DrawerSwapProduct,
    DrawerAddProduct,
    DrawerEditShipDate,
    DrawerEditFrequency,
    // DrawerEditAddress,
    DrawerAddAddress,
    DrawerEditPayment,
    DrawerEditBillingAddress,
    DrawerShippingAddresses,
    DrawerRetentionEditProducts
  },

  props: {
    products: Array,
    subscriptions: Array
  },

  data: () => ({
    drawers: {
      editProduct: DrawerEditProduct,
      swapProduct: DrawerSwapProduct,
      addProduct: DrawerAddProduct,
      editShipDate: DrawerEditShipDate,
      editFrequency: DrawerEditFrequency,
      addAddress: DrawerAddAddress,
      editPayment: DrawerEditPayment,
      // editCard: DrawerEditCard,
      editBillingAddress: DrawerEditBillingAddress,
      shippingAddresses: DrawerShippingAddresses,
      retentionEditProducts: DrawerRetentionEditProducts
    }
  }),

  computed: {
    ...mapState(['drawerOpen', 'drawerContentType'])
  },

  methods: {
    ...mapMutations(['setDrawerContentType', 'closeDrawer', 'openDrawer', 'toggleDrawer']),
    closeDrawerAndResetType() {
      this.closeDrawer()
      setTimeout(() => {
        this.setDrawerContentType(false)
      }, 301)
    }
  }
}
</script>

<style lang="scss">
.c-rDrawer {
  position: fixed;
  z-index: 1001;
  width: 100%;
  max-width: 400px;
  height: 100%;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  top: 0;
  right: 0;
  background-color: #f7f7f7;

  &.is-open {
    transform: translateX(0);
  }
}

.c-rDrawer__inner {
  padding: 50px 30px;
  overflow-y: scroll;
  max-height: 100vh;
}

.c-rDrawer__title {
  display: block;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700px;
  font-size: 23px;
  line-height: 35px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.c-rDrawer__close {
  position: absolute;
  right: 30px;
  top: 30px;

  svg {
    width: 13px;
    height: 13px;
  }
}

.c-rDrawer__actionBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .c-rButton {
    margin-bottom: 10px;
  }
}

.c-rDrawer__updateMessage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
}

.c-rDrawer__updateMessageText {
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 2px;
  text-transform: uppercase;

  &.c-rDrawer__updateMessageText--success {
    color: #7fc464;
  }
}

.c-rDrawer__updateMessageIcon--save {
  background-color: #7fc464;
  border-radius: 100px;
  color: #fff;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 6px;

  svg {
    width: 13px;
    fill: #fff;
    margin-left: -1px;
    margin-bottom: -1px;
  }
}
</style>
