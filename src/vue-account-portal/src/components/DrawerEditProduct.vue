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
            <img
              :src="getProductVariantImage(products, item.subscription)"
              alt=""
            />
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
              class="c-button"
              @click="removeProduct(item.subscription, index)"
              secondary
            >
              Remove
            </base-button>
            <base-button @click="swapProductSetup(item, index)">
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
      <base-button @click="addProductSetup">
        Add Products
      </base-button>
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
  name: 'DrawerEditProduct',

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',

      'productEditDrawerUpdating',
      'productEditDrawerSaved',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit',
      'products'
    ]),

    ...mapGetters([
      'productImages',
      'activeDeliveryScheduleGetter',
      'activeSubscriptions'
    ])
  },

  mixins: [productVariantImage],

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
@import '~styles/components/drawer-edit-product';
</style>
