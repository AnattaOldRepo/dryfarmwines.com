<template>
  <div>
    <div
      class="c-sub__initialContainer"
      v-if="initialRechargeDataLoading"
    >
      <span class="c-sub__initialMessage">Loading ...</span>
    </div>

    <div v-else>
      <div
        class="c-sub__initialContainer"
        v-if="customer.has_error_charge"
      >
        <span
          class="c-sub__initialMessage__error"
          style="max-width:700px;"
        >
          Uh oh! Something's off and your subscription has been put on hold.
          We're so sorry! Please navigate to the "your details" section of your
          account and make sure we have your most up-to-date payment info. If we
          do, then please email membership@dryfarmwines.com and we'll help get
          to the bottom of it. Sorry again for this inconvenience!
        </span>
        <div class="c-rDrawerProduct__actionBox">
          <router-link :to="{ name: 'DetailsPage', params: {} }">
            <base-button>Update Information</base-button>
          </router-link>
        </div>
      </div>

      <div
        class="c-sub__initialContainer"
        v-else-if="deliverySchedule.length === 0"
      >
        <span class="c-sub__initialMessage">looks like you have no current subscriptions.</span>
        <div class="c-rDrawerProduct__actionBox">
          <base-button
            href="/products/wine-membership"
            component-is="a"
          >
            Subscribe & Save
          </base-button>
        </div>
      </div>

      <div
        class="c-sub"
        v-else
      >
        <SubscriptionSelect
          :class="{ 'is-hidden': uniqueDeliveries.length > 1 }"
          :customer="customer"
          :delivery-schedule="deliverySchedule"
          :products="products"
          :subscriptions="subscriptions"
        />

        <div
          class="c-sub__left"
          v-if="activeDeliveryScheduleGetter"
        >
          <div class="c-sub__section">
            <h2 class="c-sub__sectionTitle">Your Next Shipment</h2>
            <div class="c-sub__sectionInner">
              <div
                class="c-sub__block"
                @click="setAndOpenDrawer('editShipDate')"
              >
                <div class="c-sub__blockSection">
                  <span class="c-sub__blockSectionLabel">Ships On</span>
                  <span class="u-text-large">{{
                    prettyDate(activeDeliveryChargeScheduledAt)
                    }}</span>
                </div>
                <base-chevron-right />
              </div>

              <hr />

              <div
                class="c-sub__block"
                style="padding: 0 30px;"
              >
                <div
                  class="c-sub__lineItems"
                  v-if="activeDeliveryScheduleGetter"
                >
                  <div
                    class="c-sub__lineItem"
                    v-for="(item,
                    index) in activeDeliveryScheduleGetter.delivery"
                    :key="index"
                    @click="setAndOpenDrawer('editProduct')"
                  >
                    <div class="c-sub__lineItemImageImageBox">
                      <img
                        :src="getProductVariantImage(products, item.subscription)"
                        alt=""
                      />
                    </div>

                    <p>{{ item.subscription.product_title }}</p>

                    <base-chevron-right />
                  </div>
                </div>
              </div>

              <hr />

              <div class="c-sub__block">
                <div
                  class="c-sub__blockSection"
                  style="cursor: default;"
                >
                  <span class="u-text-med">Total: {{ activeDeliveryPrice }}</span>
                </div>
              </div>

              <div
                class="c-sub__block"
                v-if="newProductAddedSaved"
              >
                <div class="c-sub__undoSection">
                  <div
                    class="c-rDrawer__updateMessage"
                    v-if="!updatingRemovingProduct"
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

                  <base-button
                    class="c-sub__sectionButton"
                    v-if="!updatingRemovingProduct"
                    @click="undoAddProduct"
                    secondary
                  >
                    Undo
                  </base-button>

                  <div
                    class="c-rDrawer__updateMessage"
                    v-else
                  >
                    <span class="c-rDrawer__updateMessageText">Updating...</span>
                  </div>
                </div>
              </div>
            </div>

            <base-button
              class="c-sub__sectionButton"
              @click="setAndOpenDrawer('skipAShipment')"
              v-if="!skipShipmentUpdating && !skipShipmentSaved"
              secondary
            >
              Skip A Shipment
            </base-button>

            <div
              class="c-rDrawer__updateMessage"
              style="margin: 40px 0;"
              v-if="skipShipmentSaved"
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

            <div
              class="c-rDrawer__updateMessage"
              v-if="skipShipmentUpdating"
            >
              <span class="c-rDrawer__updateMessageText">Updating...</span>
            </div>
          </div>

          <hr class="c-sub__sectionHR" />

          <div class="c-sub__section">
            <h1
              class="c-sub__sectionTitle opens-section-on-mobile"
              @click="toggle('subscriptionSettingsOpenMobile')"
              :class="{ 'is-open-title': subscriptionSettingsOpenMobile }"
            >
              Subscription Settings
              <base-chevron-right />
            </h1>
            <div
              class="c-sub__sectionInner c-sub__sectionInner--closedMobile"
              :class="{ 'is-open-mobile': subscriptionSettingsOpenMobile }"
            >
              <base-card-item
                title="Delivery Every"
                @click="setAndOpenDrawer('editFrequency')"
              >
                <span class="u-text-large">
                  {{ activeDeliveryFrequency }} {{ activeDeliveryIntervalUnit }}
                </span>
              </base-card-item>

              <hr />

              <div
                class="c-sub__block"
                style="padding: 28px 30px 0"
              >
                <div class="c-sub__blockSection">
                  <span
                    class="c-sub__blockSectionLabel"
                    style="margin-bottom: 0;"
                  >Products</span>
                  <div
                    class="c-sub__lineItems"
                    v-if="activeDeliveryScheduleGetter"
                  >
                    <div
                      class="c-sub__lineItem"
                      v-for="(item,
                      index) in activeDeliveryScheduleGetter.delivery"
                      :key="index"
                      @click="setAndOpenDrawer('editProduct')"
                    >
                      <div class="c-sub__lineItemImageImageBox">
                        <img
                          :src="getProductVariantImage(products, item.subscription)"
                          alt=""
                        />
                      </div>

                      <p>{{ item.subscription.product_title }}</p>

                      <base-chevron-right />
                    </div>
                  </div>
                </div>
              </div>

              <hr v-if="newProductAddedSaved" />

              <div
                class="c-sub__block"
                v-if="newProductAddedSaved"
              >
                <div class="c-sub__undoSection">
                  <div
                    class="c-rDrawer__updateMessage"
                    v-if="!updatingRemovingProduct"
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

                  <base-button
                    class="c-sub__sectionButton"
                    v-if="!updatingRemovingProduct"
                    @click="undoAddProduct"
                  >
                    Undo
                  </base-button>

                  <div
                    class="c-rDrawer__updateMessage"
                    v-else
                  >
                    <span class="c-rDrawer__updateMessageText">Updating...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="c-sub__sectionHR" />

          <div class="c-sub__section">
            <h1
              class="c-sub__sectionTitle opens-section-on-mobile"
              @click="toggle('addressPaymentOpenMobile')"
              :class="{ 'is-open-title': addressPaymentOpenMobile }"
            >
              Address & Payment
              <base-chevron-right />
            </h1>
            <div
              class="c-sub__sectionInner c-sub__sectionInner--closedMobile"
              :class="{ 'is-open-mobile': addressPaymentOpenMobile }"
            >
              <div
                class="c-sub__block"
                @click="setAndOpenDrawer('shippingAddresses')"
              >
                <div class="c-sub__blockSection c-sub__blockSection--address">
                  <span
                    class="c-sub__blockSectionLabel"
                    style="margin-bottom: 10px;"
                  >Shipping Address</span>
                  <div>
                    <span
                      v-if="activeDeliveryAddressGetter.first_name"
                      class="is-inline"
                    >{{ activeDeliveryAddressGetter.first_name }}</span>
                    <span
                      v-if="activeDeliveryAddressGetter.last_name"
                      style="margin-left: 3px;"
                      class="is-inline"
                    >{{ activeDeliveryAddressGetter.last_name }}</span>
                    <span v-if="activeDeliveryAddressGetter.address1">{{
                      activeDeliveryAddressGetter.address1
                      }}</span>
                    <span v-if="activeDeliveryAddressGetter.address2">{{
                      activeDeliveryAddressGetter.address2
                      }}</span>
                    <span v-if="activeDeliveryAddressGetter.company">{{
                      activeDeliveryAddressGetter.company
                      }}</span>
                    <span
                      class="is-inline"
                      v-if="activeDeliveryAddressGetter.city"
                    >{{ activeDeliveryAddressGetter.city }},</span><span
                      style="margin-left: 3px;"
                      class="is-inline"
                      v-if="activeDeliveryAddressGetter.province"
                    >{{ activeDeliveryAddressGetter.province }}</span><span
                      class="is-inline"
                      style="margin-left: 3px;"
                      v-if="activeDeliveryAddressGetter.zip"
                    >
                      {{ activeDeliveryAddressGetter.zip }}</span>
                    <span v-if="activeDeliveryAddressGetter.country">
                      {{ activeDeliveryAddressGetter.country }}</span>
                    <span v-if="activeDeliveryAddressGetter.phone">
                      {{ activeDeliveryAddressGetter.phone }}</span>
                  </div>
                </div>

                <base-chevron-right />
              </div>

              <hr />

              <div
                class="c-sub__block"
                @click="setAndOpenDrawer('editPayment')"
              >
                <div class="c-sub__blockSection">
                  <span class="c-sub__blockSectionLabel">Payment Method</span>
                  <div
                    class="c-sub__card"
                    v-if="customer.customer_card"
                  >
                    <img
                      v-if="creditCardImage"
                      :src="creditCardImage"
                    />
                    <span> *{{ customer.customer_card.last4 }}</span>
                    <span>{{ customer.customer_card.exp_month }}/{{
                      customer.customer_card.exp_year
                      }}</span>
                  </div>
                </div>

                <base-chevron-right />
              </div>
            </div>
            <base-button
              class="c-sub__sectionButton"
              to="/retention"
              secondary
            >
              Cancel Subscription
            </base-button>
          </div>
        </div>

        <hr class="c-sub__sectionHR">

        <div
          class="c-sub__right"
          v-if="activeDeliveryScheduleGetter"
        >
          <h1 class="c-sub__sectionTitle">Add Product</h1>
          <div class="c-subProductGrid">
            <grid-product
              v-for="product in visibleProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <base-button
            class="c-sub__browseAll"
            v-if="visibleProductsCount !== products.length"
            @click="browseAllProducts"
            secondary
          >
            Browse All
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import GridProduct from '@/components/GridProduct'
import SubscriptionSelect from '@/components/SubscriptionSelect'
import moment from 'moment'
import productVariantImage from '@/mixins/productVariantImage'
import { rechargeURL, siteURL } from '@/config'

export default {
  name: 'Subscription',

  components: {
    SubscriptionSelect,
    GridProduct
  },

  props: {
    customer: {
      type: Object,
      required: true
    },

    deliverySchedule: {
      type: Array,
      required: false
    },

    products: {
      type: Array,
      required: false
    },

    subscriptions: {
      type: Array,
      required: true
    }
  },

  mixins: [productVariantImage],

  data: () => ({
    initialDataLoading: true,
    visibleProductsCount: 6,
    selectedDeliverySchedule: false,
    selectedDeliveryScheduleIndex: null,

    subscriptionSettingsOpenMobile: false,
    addressPaymentOpenMobile: false,
    siteURL
  }),

  computed: {
    ...mapState([
      'drawerOpen',
      'drawerContentType',
      'initialRechargeDataLoading',
      'skipShipmentUpdating',
      'skipShipmentSaved',
      'newProductAddedSaved',
      'updatingRemovingProduct',
      'ShipmentUpdating',
      'ShipmentSaved',
      'activeDeliverySchedule',
      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryAddress',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit',
      'products'
    ]),

    ...mapGetters([
      'activeDeliveryAddressGetter',
      'availableProducts',
      'activeDeliveryChargeScheduledAt',
      'uniqueDeliveries',
      'activeDeliveryScheduleGetter'
    ]),

    activeDeliveryPrice() {
      let displayPrice = 0

      this.activeDeliveryScheduleGetter.delivery.forEach(item => {
        let itemPrice = item.subscription.price * item.subscription.quantity

        displayPrice += itemPrice
      })

      displayPrice = displayPrice.toString().replace('.', '')

      return this.formatMoney(displayPrice)
    },

    visibleProducts() {
      let { visibleProductsCount } = this
      return this.availableProducts.slice(0, visibleProductsCount)
    },

    customerName() {
      let name = ''
      const { firstName, lastName } = this

      if (firstName) {
        name += firstName
      }

      if (lastName) {
        name += ` ${lastName}`
      }

      return name
    },

    creditCardImage() {
      let creditCardBrand = ''
      let creditCardImage = ''

      if (this.customer.customer_card && this.customer.customer_card.brand) {
        creditCardBrand = this.customer.customer_card.brand
      }

      switch (creditCardBrand) {
        case 'Visa':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/visa-icon.png?9900082236234763207'
          break
        case 'American Express':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/amex-icon.png?9900082236234763207'
          break
        case 'Mastercard':
          creditCardImage =
            'https://cdn.shopify.com/s/files/1/0739/9341/files/mastercard-icon.png?9900082236234763207'
          break
        default:
          creditCardImage = false
      }

      return creditCardImage
    }
  },

  methods: {
    ...mapActions(['undoAddProduct', 'skipShipmentAction']),

    ...mapMutations([
      'setDrawerContentType',
      'openDrawer',
      'openModal',
      'setActiveDeliverySchedule',
      'setActiveDeliveryScheduleIndex',
      'setActiveFirstDeliverySubscription',
      'setActiveDeliveryAddressId',
      'setActiveDeliveryFrequency',
      'setActiveDeliveryIntervalUnit'
    ]),

    skipShipment() {
      let payload = {
        date: this.activeDeliveryChargeScheduledAt.split('T')[0],
        item_ids: [],
        charge_id: this.activeDeliveryScheduleGetter.delivery[0].charge_id
      }

      this.activeDeliveryScheduleGetter.delivery.forEach(delivery => {
        payload.item_ids.push(delivery.subscription.id)
      })

      this.skipShipmentAction(payload)
    },

    setActiveDeliveryScheduleLocal() {
      const activeFirstDeliverySubscription = this.selectedDeliverySchedule
        .delivery[0].subscription

      this.setActiveDeliverySchedule(this.selectedDeliverySchedule)
      this.setActiveDeliveryScheduleIndex(this.selectedDeliveryScheduleIndex)

      this.setActiveFirstDeliverySubscription(activeFirstDeliverySubscription)
      this.setActiveDeliveryAddressId(
        activeFirstDeliverySubscription.address_id
      )
      this.setActiveDeliveryFrequency(
        activeFirstDeliverySubscription.charge_interval_frequency
      )
      this.setActiveDeliveryIntervalUnit(
        activeFirstDeliverySubscription.charge_interval_unit
      )
    },

    selectDelivery(deliverySchedule, index) {
      this.selectedDeliverySchedule = deliverySchedule
      this.selectedDeliveryScheduleIndex = index
    },

    prettyDate(date) {
      return moment(date).format('MMM Do')
    },

    setAndOpenDrawer(contentType) {
      this.setDrawerContentType(contentType)
      this.openDrawer()
    },

    browseAllProducts() {
      this.visibleProductsCount = this.products.length
    },

    toggle(dataProp) {
      this[dataProp] = !this[dataProp]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/pages/subscription-page';
</style>
