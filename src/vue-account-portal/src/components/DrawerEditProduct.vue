<template>
  <div class="c-rDrawerEditProduct">
    <span class="c-rDrawer__title">Edit Products</span>

    <p class="c-rDrawerEditProduct__shipText">
      These products ship every {{ activeDeliveryFrequency }}
      {{ activeDeliveryIntervalUnit }}s.
    </p>

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
            <img :src="productImages[item.subscription.shopify_product_id]" />
          </div>

          <div class="c-editProduct__lineitemInfoBox">
            <p>
              {{ item.subscription.product_title }}
            </p>
            <span>{{
              formatMoney(item.subscription.price * item.subscription.quantity)
              }}</span>
          </div>
        </div>

        <div class="c-editProduct__lineitemEdit">
          <div class="c-editProduct__lineitemButtonBox">
            <base-button
              class="c-rButton"
              style="padding:10px 18px;"
              @click="removeProduct(item.subscription, index)"
              secondary
            >
              Remove
            </base-button>
            <base-button
              class="c-rButton"
              @click="swapProductSetup(item, index)"
            >
              Swap
            </base-button>
          </div>
          <div class="c-editProduct__lineitemQuantityBox">
            <span @click="updateQuantity(item.subscription, 'remove', index)">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 491.858 491.858"
                style="enable-background:new 0 0 491.858 491.858;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path d="M465.167,211.613H240.21H26.69c-8.424,0-26.69,11.439-26.69,34.316s18.267,34.316,26.69,34.316h213.52h224.959
                                        c8.421,0,26.689-11.439,26.689-34.316S473.59,211.613,465.167,211.613z" />
                  </g>
                </g>
              </svg>
            </span>
            <span class="c-editProduct__lineitemQuantity">{{
              item.subscription.quantity
              }}</span>

            <span @click="updateQuantity(item.subscription, 'add', index)">
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 491.86 491.86"
                style="enable-background:new 0 0 491.86 491.86;"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69
                                            C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69
                                            s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z" />
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="c-rDrawerProduct__actionBox">
      <a
        class="c-rButton c-rButton--red"
        @click.prevent="addProductSetup"
      >
        Add Products
      </a>
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

export default {
  name: 'DrawerEditProduct',

  props: {
    // product: {
    //     type: Object,
    //     required: true
    // }
  },

  data: function() {
    return {}
  },

  mounted() {},

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',

      'productEditDrawerUpdating',
      'productEditDrawerSaved',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit'
    ]),

    ...mapGetters([
      'productImages',
      'activeDeliveryScheduleGetter',
      'activeSubscriptions'
    ])
  },

  methods: {
    ...mapMutations([
      'setDrawerContentType',
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',

      'openModal',

      'setSubscriptionToSwap',

      'setProductEditDrawerSaved',
      'setProductEditDrawerUpdating'
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

    addProductSetup() {
      this.setDrawerContentType('addProduct')
    },

    removeProduct(item, index) {
      if (this.productEditDrawerUpdating) {
        console.log('update in progress, exit')
        return
      }

      if (this.activeSubscriptions.length <= 1) {
        this.closeDrawer()
        this.openModal()
      } else {
        let payload = {}

        payload = {
          subscriptionId: item.id,
          indexInDelivery: index
        }

        this.removeProductAction(payload)
      }
    },

    updateQuantity(item, addOrRemove, index) {
      let payload = {}
      let currentQuantity = item.quantity
      let newQuantity = null

      console.log('item', item)
      console.log('addOrRemove', addOrRemove)
      console.log('index', index)

      if (addOrRemove === 'add') {
        newQuantity = currentQuantity + 1
      } else if (addOrRemove === 'remove') {
        newQuantity = currentQuantity - 1
      } else {
        console.log(
          'updateQuantity requires either or "add" or "remove" as a param'
        )
        return
      }

      console.log('newQuantity', newQuantity)

      if (newQuantity <= 0) {
        console.log(
          'Unable to remove product by changing quantity, remove entire subscription'
        )
        this.removeProduct(item, index)
      } else {
        payload = {
          subscriptionId: item.id,
          newQuantity: newQuantity,
          indexInDelivery: index
        }

        this.updateQuantityAction(payload)
      }
    },

    closeDrawerAndResetType() {
      this.closeDrawer()

      this.setProductEditDrawerUpdating(false)
      this.setProductEditDrawerSaved(false)

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
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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
