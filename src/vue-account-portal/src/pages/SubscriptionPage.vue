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
          <base-button>
            <a :href="`${this.siteURL}/pages/membership`">
              Subscribe & Save
            </a>
          </base-button>
        </div>
      </div>

      <div
        class="c-sub clearfix"
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
                @click.prevent="openDrawerEditShipDate"
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
                    @click.prevent="openDrawerEditProduct"
                  >
                    <div class="c-sub__lineItemImageImageBox">
                      <img :src="
                          productImages[item.subscription.shopify_product_id]
                        " />
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
              @click="skipShipment"
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
              @click="toggleSubscriptionSettingsMobile()"
              :class="{ 'is-open-title': subscriptionSettingsOpenMobile }"
            >
              Subscription Settings
              <base-chevron-right />
            </h1>
            <div
              class="c-sub__sectionInner c-sub__sectionInner--closedMobile"
              :class="{ 'is-open-mobile': subscriptionSettingsOpenMobile }"
            >
              <div
                class="c-sub__block"
                @click.prevent="openDrawerEditFrequency"
              >
                <div class="c-sub__blockSection">
                  <span class="c-sub__blockSectionLabel">Delivery Every</span>
                  <span class="u-text-large">{{ activeDeliveryFrequency }}
                    {{ activeDeliveryIntervalUnit }}</span>
                </div>

                <base-chevron-right />
              </div>

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
                      @click.prevent="openDrawerEditProduct"
                    >
                      <div class="c-sub__lineItemImageImageBox">
                        <img :src="
                            productImages[item.subscription.shopify_product_id]
                          " />
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
              @click="toggleAddressPaymentMobile()"
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
                @click.prevent="openDrawerEditShippingAddresses"
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
                @click.prevent="editBillingAddress"
              >
                <div class="c-sub__blockSection c-sub__blockSection--address">
                  <span
                    class="c-sub__blockSectionLabel"
                    style="margin-bottom: 10px;"
                  >Billing Address</span>
                  <div>
                    <span
                      v-if="billingAddressGetter.first_name"
                      class="is-inline"
                    >{{ billingAddressGetter.first_name }}</span>
                    <span
                      v-if="billingAddressGetter.last_name"
                      style="margin-left: 3px;"
                      class="is-inline"
                    >{{ billingAddressGetter.last_name }}</span>
                    <span v-if="billingAddressGetter.address1">{{
                      billingAddressGetter.address1
                      }}</span>
                    <span v-if="billingAddressGetter.address2">{{
                      billingAddressGetter.address2
                      }}</span>
                    <span v-if="billingAddressGetter.company">{{
                      billingAddressGetter.company
                      }}</span>
                    <span
                      class="is-inline"
                      v-if="billingAddressGetter.city"
                    >{{ billingAddressGetter.city }},</span><span
                      class="is-inline"
                      v-if="billingAddressGetter.province"
                      style="margin-left: 3px;"
                    >{{ billingAddressGetter.province }}</span><span
                      class="is-inline"
                      v-if="billingAddressGetter.zip"
                      style="margin-left: 3px;"
                    >
                      {{ billingAddressGetter.zip }}</span>
                    <span v-if="billingAddressGetter.country">
                      {{ billingAddressGetter.country }}</span>
                    <span v-if="billingAddressGetter.phone">
                      {{ billingAddressGetter.phone }}</span>
                  </div>
                </div>

                <base-chevron-right />
              </div>

              <hr />

              <div
                class="c-sub__block"
                @click.prevent="openDrawerEditPayment"
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
              @click="cancelSubscription"
              secondary
            >
              Cancel Subscription
            </base-button>
          </div>
        </div>

        <hr class="c-sub__sectionHR" />

        <div
          class="c-sub__right"
          v-if="activeDeliveryScheduleGetter"
        >
          <h1 class="c-sub__sectionTitle">Mix & Match</h1>
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
import GridProduct from '../components/GridProduct.vue'
import SubscriptionSelect from '../components/SubscriptionSelect.vue'
import moment from 'moment'
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

      'customerHash',

      'initialRechargeDataLoading',

      'skipShipmentUpdating',
      'skipShipmentSaved',

      'newProductAddedSaved',
      'frequencySaved',
      'updatingRemovingProduct',

      'ShipmentUpdating',
      'ShipmentSaved',

      'activeDeliverySchedule',
      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryAddress',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit'
    ]),

    ...mapGetters([
      'activeSubscriptions',
      'activeDeliveryAddressGetter',
      'billingAddressGetter',
      'productImages',
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
        case 'Amex':
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
      'closeDrawer',
      'openDrawer',
      'toggleDrawer',

      'closeModal',
      'openModal',
      'toggleModal',

      'setActiveDeliverySchedule',
      'setActiveDeliveryScheduleIndex',

      'setActiveFirstDeliverySubscription',
      'setActiveDeliveryAddressId',
      'setActiveDeliveryFrequency',
      'setActiveDeliveryIntervalUnit'
    ]),

    editCard() {
      let editCardUrl = `${rechargeURL}${this.customerHash}/card`

      document.location = editCardUrl
    },

    editBillingAddress() {
      let editBillingAddressUrl = `${rechargeURL}${this.customerHash}/edit/`

      // editBillingAddressUrl += '?preview_theme=1792#/' // only for testing

      document.location = editBillingAddressUrl
    },

    cancelSubscription() {
      this.openModal()
    },

    skipShipment() {
      let payload = {
        date: this.activeDeliveryChargeScheduledAt.split('T')[0],
        item_ids: [],
        charge_id: this.activeDeliveryScheduleGetter.delivery[0].charge_id
      }

      // console.log(this.activeDeliveryChargeScheduledAt)
      // console.log(this.activeDeliveryChargeScheduledAt.split('T')[0])

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

    openDrawerEditShipDate() {
      this.setDrawerContentType('editShipDate')
      this.openDrawer()
    },

    openDrawerEditFrequency() {
      this.setDrawerContentType('editFrequency')
      this.openDrawer()
    },

    openDrawerEditProduct() {
      this.setDrawerContentType('editProduct')
      this.openDrawer()
    },

    openDrawerEditBillingAddress() {
      this.setDrawerContentType('editBillingAddress')
      this.openDrawer()
    },

    openDrawerEditPayment() {
      this.setDrawerContentType('editPayment')
      this.openDrawer()
    },

    openDrawerEditShippingAddresses() {
      this.setDrawerContentType('shippingAddresses')
      this.openDrawer()
    },

    browseAllProducts() {
      this.visibleProductsCount = this.products.length
    },

    toggleSubscriptionSettingsMobile() {
      this.subscriptionSettingsOpenMobile = !this.subscriptionSettingsOpenMobile
    },

    toggleAddressPaymentMobile() {
      this.addressPaymentOpenMobile = !this.addressPaymentOpenMobile
    }
  }
}
</script>

<style lang="scss">
.test {
  color: #000;
}

.c-sub {
  // margin-left: 190px;
  padding: 54px 20px 0;
  margin: 0 auto;
  max-width: 1120px;

  @media (max-width: 1023px) {
    padding: 54px 28px 0;
  }
}

.c-sub__left {
  margin-right: 68px;
  float: left;
  max-width: 350px;
  width: 100%;

  @media (max-width: 1023px) {
    margin: 0 auto;
    float: none;
  }
}

.c-sub__section {
  width: 100%;
  margin-bottom: 65px;

  @media (max-width: 1023px) {
    text-align: center;
  }
}

.c-sub__sectionHR {
  display: none;
  @media (max-width: 1023px) {
    display: block;
    color: #dcdcdc;
    height: 1px;
    width: 100%;
    margin-bottom: 60px;
  }
}

.c-sub__sectionTitle {
  font-weight: 400;
  font-size: 19px;
  line-height: 29px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 20px;
  padding: 0;
  border: none;
  text-align: left;

  svg {
    display: none;
  }

  @media (max-width: 1023px) {
    text-align: center;

    &.opens-section-on-mobile {
      cursor: pointer;
    }

    &.is-open-title {
      svg {
        transform: rotate(270deg);
      }
    }

    svg {
      display: inline-block;
      width: 14px;
      height: 14px;
      transform: rotate(90deg);
    }
  }
}

.c-sub__sectionInner {
  border: 1px solid #dddddd;

  hr {
    display: block;
    width: calc(100% - 60px);
    margin: 0 auto;
  }

  @media (max-width: 1023px) {
    text-align: left;

    &.c-sub__sectionInner--closedMobile {
      display: none;

      &.is-open-mobile {
        display: block;
      }
    }
  }
}

.c-sub__block {
  padding: 28px 30px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1023px) {
    padding: 20px;
  }

  svg {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
  }
}

.c-sub__blockSection {
  span {
    &.u-text-large {
      line-height: 1 !important;
    }
  }

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0;
    display: block;
    color: #000;

    &.is-inline {
      display: inline-block;
    }

    &.c-sub__blockSectionLabel {
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 17px;
      text-align: left;
    }
  }
  &.c-sub__blockSection--address {
    span:not(.c-sub__blockSectionLabel) {
      line-height: 19px;
    }
  }

  .c-sub__card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 10px;

    img {
      width: 30px;
      margin-right: 10px;
    }

    span {
      display: inline-block;
      margin-bottom: 0;
      line-height: 1;

      &:first-of-type {
        margin-right: 5px;
      }
    }
  }
}

.c-sub__sectionButton {
  margin-top: 54px;

  @media (max-width: 1023px) {
    margin-top: 30px;
  }
}

.c-sub__lineItems {
  // padding: 40px 0;
  // border-top: 1px solid #737373;
  // border-bottom: 1px solid #737373;
  // width: calc(100% - 60px);
  // margin: 0 auto;
  width: 100%;
}

.c-sub__lineItem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;
  position: relative;

  &:last-of-type {
    border-bottom: none;
  }

  .c-sub__lineItemImageImageBox {
    max-width: 50px;
    margin-right: 10px;

    img {
      display: block;
      max-width: 100px;
      width: 100%;
    }
  }

  p {
    max-width: 70%;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0px;
    margin: 0;
  }

  span {
    &.is-faded {
      opacity: 0.25;
    }
  }

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.c-sub__undoSection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .c-rDrawer__updateMessage {
    margin: 0 auto 18px;
  }

  .c-sub__sectionButton {
    margin: 0;
  }
}

.c-sub__right {
  float: left;
  width: 100%;
  max-width: calc(100% - 420px);

  @media (max-width: 1023px) {
    float: none;
    width: 100%;
    max-width: none;
  }

  .c-sub__sectionTitle {
    margin-left: 16px;
  }
}

.c-subProductGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5%;
  grid-row-gap: 40px;
  margin-bottom: 92px;

  @media (max-width: 1023px) {
    max-width: 800px;
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-column-gap: 0;
  }
}

.c-sub__browseAll {
  display: block;
  max-width: 224px;
  margin: 0 auto 100px;

  @media (max-width: 1023px) {
    margin: 30px auto 70px;
  }
}

.u-text-large {
  font-size: 23px !important;
  line-height: 35px !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
}

.u-text-med {
  font-size: 16px !important;
  line-height: 25px !important;
  font-weight: 400 !important;
  letter-spacing: 0 !important;
}

.c-sub__initialMessage__error {
  font-size: 18px;
  line-height: 35px;
  font-weight: 700;
  letter-spacing: 3px;
  text-align: center;
  text-transform: none;
  margin-bottom: 60px;
}
</style>
