<template>
  <div>
    <div class="c-sub__initialContainer" v-if="initialRechargeDataLoading">
      <span class="c-sub__initialMessage">Loading...</span>
    </div>

    <div class="c-details clearfix" v-else>
      <div class="c-details__left">
        <div class="c-details__section" v-if="deliverySchedule.length">
          <h1 class="c-details__sectionTitle">Your Subscription</h1>
          <router-link
            class="c-details__sectionInner"
            tag="div"
            :to="{ name: 'SubscriptionPage' }"
          >
            <div class="c-details__block">
              <div class="c-details__blockSection">
                <span class="c-details__blockSectionLabel">{{
                  customerName
                }}</span>
                <span
                  >Next shipment is on
                  {{ prettyDate(activeDeliveryChargeScheduledAt) }}</span
                >
              </div>

              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="306px"
                height="306px"
                viewBox="0 0 306 306"
                style="enable-background:new 0 0 306 306;"
                xml:space="preserve"
              >
                <polygon
                  points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		"
                />
              </svg>
            </div>
          </router-link>
        </div>

        <div class="c-details__section">
          <h1 class="c-details__sectionTitle">Billing Address</h1>
          <div class="c-details__sectionInner">
            <div class="c-details__block" @click.prevent="editBillingAddress">
              <div
                class="c-details__blockSection c-details__blockSection--address"
              >
                <span
                  class="c-details__blockSectionLabel"
                  style="margin-bottom: 10px;"
                  >Billing Address</span
                >
                <div>
                  <span
                    v-if="billingAddressGetter.first_name"
                    class="is-inline"
                    >{{ billingAddressGetter.first_name }}</span
                  >
                  <span
                    v-if="billingAddressGetter.last_name"
                    style="margin-left: 3px;"
                    class="is-inline"
                    >{{ billingAddressGetter.last_name }}</span
                  >
                  <span v-if="billingAddressGetter.address1">{{
                    billingAddressGetter.address1
                  }}</span>
                  <span v-if="billingAddressGetter.address2">{{
                    billingAddressGetter.address2
                  }}</span>
                  <span v-if="billingAddressGetter.company">{{
                    billingAddressGetter.company
                  }}</span>
                  <span class="is-inline" v-if="billingAddressGetter.city"
                    >{{ billingAddressGetter.city }},</span
                  ><span
                    class="is-inline"
                    v-if="billingAddressGetter.province"
                    style="margin-left: 3px;"
                    >{{ billingAddressGetter.province }}</span
                  ><span
                    class="is-inline"
                    v-if="billingAddressGetter.zip"
                    style="margin-left: 3px;"
                  >
                    {{ billingAddressGetter.zip }}</span
                  >
                  <span v-if="billingAddressGetter.country">
                    {{ billingAddressGetter.country }}</span
                  >
                  <span v-if="billingAddressGetter.phone">
                    {{ billingAddressGetter.phone }}</span
                  >
                </div>
              </div>

              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="306px"
                height="306px"
                viewBox="0 0 306 306"
                style="enable-background:new 0 0 306 306;"
                xml:space="preserve"
              >
                <polygon
                  points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		"
                />
              </svg>
            </div>
          </div>
          <a
            class="c-details__sectionButton c-rButton"
            @click.prevent="editBillingAddress"
          >
            <span>
              Edit Address
            </span>
          </a>
        </div>

        <div class="c-details__section">
          <h1 class="c-details__sectionTitle">Payment Method</h1>
          <div class="c-details__sectionInner">
            <div
              class="c-details__block"
              @click.prevent="openDrawerEditPayment"
            >
              <div class="c-details__blockSection">
                <span class="c-details__blockSectionLabel">Payment Method</span>
                <div
                  class="c-details__card"
                  v-if="
                    customer.customer_payment_type === 'credit' &&
                      customer.customer_card
                  "
                >
                  <img v-if="creditCardImage" :src="creditCardImage" />
                  <span> *{{ customer.customer_card.last4 }}</span>
                  <span
                    >{{ customer.customer_card.exp_month }}/{{
                      customer.customer_card.exp_year
                    }}</span
                  >
                </div>

                <div
                  class="c-details__card"
                  v-if="customer.customer_payment_type === 'paypal'"
                >
                  <span>Paypal</span>
                </div>

                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="306px"
                  height="306px"
                  viewBox="0 0 306 306"
                  style="enable-background:new 0 0 306 306;"
                  xml:space="preserve"
                >
                  <polygon
                    points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153 		"
                  />
                </svg>
              </div>
            </div>
          </div>
          <a
            class="c-details__sectionButton c-rButton"
            v-if="customer.customer_payment_type === 'credit'"
            :href="updateCardUrl"
          >
            <span>Edit Card</span>
          </a>

          <div class="c-details__card" v-if="paypalEditInfoVisible">
            <span class="c-details__paypalInfo">
              <br />
              You need to login to
              <a
                target="_blank"
                href="https://www.paypal.com/us/cgi-bin/webscr?cmd=_login-run"
                >PayPal</a
              >
              to update your card. Here are detailed
              <a
                target="_blank"
                href="https://www.paypal.com/us/webapps/helpcenter/helphub/article/?solutionId=FAQ999&topicID=PAYING&m=TCI"
                >instructions</a
              >.
            </span>
          </div>

          <a
            class="c-details__sectionButton c-rButton"
            v-if="customer.customer_payment_type === 'paypal'"
            @click.prevent="showPaypalEditInfo"
          >
            <span>Edit Card</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Details',

  props: {
    customer: {
      type: Object,
      required: true
    },

    deliverySchedule: {
      type: Array,
      required: false
    }
  },

  data: function() {
    return {
      paypalEditInfoVisible: false
    }
  },

  mounted() {},

  computed: {
    ...mapState([
      'customerHash',

      'drawerOpen',
      'drawerContentType',

      'initialRechargeDataLoading',

      'newProductAddedSaved',
      'frequencySaved',
      'updatingRemovingProduct',

      'activeFirstDeliverySubscription',
      'activeDeliveryAddressId',
      'activeDeliveryFrequency',
      'activeDeliveryIntervalUnit'
    ]),

    ...mapGetters([
      'activeSubscriptions',
      'activeDeliveryChargeScheduledAt',
      'billingAddressGetter'
    ]),

    updateCardUrl() {
      return `/tools/recurring/customer/${this.customerHash}/card/`
    },

    customerName() {
      var name = ''
      var firstName = this.customer.first_name
      var lastName = this.customer.last_name

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

      console.log(creditCardBrand)

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
    ...mapActions([]),

    prettyDate(date) {
      return moment(date).format('MMM Do')
    },

    ...mapMutations([
      'setDrawerContentType',
      'openDrawer',

      'setActiveFirstDeliverySubscription',
      'setActiveDeliveryAddressId',
      'setActiveDeliveryFrequency',
      'setActiveDeliveryIntervalUnit'
    ]),

    showPaypalEditInfo() {
      this.paypalEditInfoVisible = true
    },

    openDrawerEditBillingAddress() {
      this.setDrawerContentType('editBillingAddress')
      this.openDrawer()
    },

    editBillingAddress() {
      let editBillingAddressUrl = `https://www.dryfarmwines.com/tools/recurring/customer_portal/${
        this.customerHash
      }/edit/`

      // editBillingAddressUrl += '?preview_theme=1792#/' // only for testing

      document.location = editBillingAddressUrl
    },

    openDrawerEditPayment() {
      this.setDrawerContentType('editPayment')
      this.openDrawer()
    }
  }
}
</script>

<style lang="scss">
.c-details {
  // margin-left: 190px;
  // padding: 54px 0 0;

  padding: 54px 20px 0;
  lost-utility: clearfix;
  margin: 0 auto;
  max-width: 1060px;

  @media (max-width: 1023px) {
    padding: 54px 28px 0;
  }
}

.c-details__paypalInfo {
  a {
    color: #ee2e2d;
    font-weight: 700;
    font-family: Gotham;
  }
}

.c-details__left {
  margin-right: 68px;
  float: left;
  max-width: 350px;
  width: 100%;

  @media (max-width: 1023px) {
    float: none;
    margin: 0 auto;
  }
}

.c-details__right {
  float: left;
  width: 100%;
  max-width: 350px;
}

.c-details__section {
  width: 100%;
  margin-bottom: 65px;

  @media (max-width: 1023px) {
    text-align: center;
  }
}

.c-details__sectionTitle {
  font-family: Gotham Book;
  font-weight: 400;
  font-size: 19px;
  line-height: 29px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0 0 20px;
  padding: 0;
  border: none;
  text-align: left;

  @media (max-width: 1023px) {
    text-align: center;
  }
}

.c-details__sectionInner {
  background-color: #f7f7f7;

  hr {
    display: block;
    width: calc(100% - 60px);
    margin: 0 auto;
  }

  @media (max-width: 1023px) {
    text-align: left;
  }
}

.c-details__block {
  padding: 28px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;

  @media (max-width: 1023px) {
    padding: 20px;
  }

  svg {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.c-details__blockSection {
  span {
    font-family: Gotham Book;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0;
    display: block;
    color: #000;

    &.is-inline {
      display: inline-block;
    }

    &.c-details__blockSectionLabel {
      font-family: Gotham;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
  &.c-details__blockSection--address {
    span:not(.c-details__blockSectionLabel) {
      line-height: 19px;
    }
  }

  .c-details__card {
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

.c-details__sectionButton {
  margin-top: 34px;
}
</style>
